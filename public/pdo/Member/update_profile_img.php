<?php

/**
 * 最基本版：不依賴 GD，不壓縮/不轉檔。
 * 1) 驗證登入（Session 或 Bearer）
 * 2) 驗證檔案型別/大小
 * 3) 直接 move_uploaded_file() 到 uploads/avatars/{uid}/
 * 4) 更新 Member.image（相對路徑）
 * 5) 回傳 { success, data: { avatarUrl, cacheBustParam } }
 */


include '../pdo.php';

// 若是預檢請求，cors.php 一般已處理；這裡再保險一次
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  exit;
};

// 只允許 POST（multipart/form-data）
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  echo json_encode(['success' => false, 'message' => '請用 POST（multipart/form-data）上傳'], JSON_UNESCAPED_UNICODE);
  exit;
};

// 取得登入會員 ID（先 Session，後 Bearer）
session_start();
$uid = (int)($_SESSION['memberID'] ?? 0);

if ($uid === 0) {
  // 兼容取得 Authorization header
  $hdr = $_SERVER['HTTP_AUTHORIZATION'] ?? ($_SERVER['Authorization'] ?? '');
  if ($hdr === '' && function_exists('getallheaders')) {
    $all = getallheaders();
    if (!empty($all['Authorization'])) $hdr = $all['Authorization'];
    if (!$hdr && !empty($all['authorization'])) $hdr = $all['authorization'];
  }
  $tok = (stripos($hdr, 'Bearer ') === 0) ? substr($hdr, 7) : '';
  if ($tok !== '') {
    $ts = $pdo->prepare('SELECT member_id FROM `Tokens` 
                        WHERE token=:t AND expires_at>NOW() 
                        LIMIT 1');
    $ts->execute([':t' => $tok]);
    if ($row = $ts->fetch(PDO::FETCH_ASSOC)) $uid = (int)$row['member_id'];
  }
};

if ($uid === 0) {
  echo json_encode(['success' => false, 'message' => '尚未登入'], JSON_UNESCAPED_UNICODE);
  exit;
};

// 取檔案（支援 avatar 或 image 兩種欄位名）
$file = $_FILES['avatar'] ?? ($_FILES['image'] ?? null);


if (!$file || !is_uploaded_file($file['tmp_name'])) {
  echo json_encode(['success'=>false,'message'=>'請附上檔案欄位 avatar（或 image）'], JSON_UNESCAPED_UNICODE);
  exit;
};

if ($file['error'] !== UPLOAD_ERR_OK) {
  $msg = '上傳失敗';
  if (in_array($file['error'], [UPLOAD_ERR_INI_SIZE, UPLOAD_ERR_FORM_SIZE], true)) $msg = '檔案過大';
  echo json_encode(['success'=>false,'message'=>$msg], JSON_UNESCAPED_UNICODE);
  exit;
};

// 檔案限制
if ($file['size'] > 2 * 1024 * 1024) {
    echo json_encode(['success'=>false,'message'=>'檔案超過 2MB 限制'], JSON_UNESCAPED_UNICODE);
    exit;
}

// 檢查型別（盡量不用 GD）：先用 fileinfo，失敗就用簡單 magic number 檢查
$mime = '';
if (function_exists('finfo_open')) {
    $fi = finfo_open(FILEINFO_MIME_TYPE);
    if ($fi) { 
        $mime = finfo_file($fi, $file['tmp_name']) ?: ''; 
        finfo_close($fi); 
    }
}
if ($mime === '') {
    // 簡單 magic bytes（只做基本把關）
    $bytes = file_get_contents($file['tmp_name'], false, null, 0, 12);
    if ($bytes !== false) {
        if (strncmp($bytes, "\xFF\xD8\xFF", 3) === 0) $mime = 'image/jpeg';
        elseif (strncmp($bytes, "\x89PNG\x0D\x0A\x1A\x0A", 8) === 0) $mime = 'image/png';
        elseif (substr($bytes, 0, 4) === 'RIFF' && substr($bytes, 8, 4) === 'WEBP') $mime = 'image/webp';
    }
}
$allow = ['image/jpeg','image/png','image/webp'];
if (!in_array($mime, $allow, true)) {
    echo json_encode(['success'=>false,'message'=>'僅允許 JPG / PNG / WebP'], JSON_UNESCAPED_UNICODE);
    exit;
}

// 依 MIME 決定副檔名（不信任原檔名）
$ext = ($mime === 'image/png') ? 'png' : (($mime === 'image/webp') ? 'webp' : 'jpg');

// 再用 getimagesize 兜一層，避免偽裝檔案
// $imgInfo = @getimagesize($file['tmp_name']);
// if ($imgInfo === false) {
//   echo json_encode(['success'=>false, 'message'=>'檔案不是有效的圖片'], JSON_UNESCAPED_UNICODE);
//   exit;
// };

// 目錄與檔名
// $rootDir   = dirname(__DIR__); // Member/.. -> 專案根
// $saveDir   = $rootDir . '/uploads/avatars/' . $uid . '/';
// $publicRel = 'uploads/avatars/' . $uid . '/'; // 存 DB 用相對路徑

$memberID = $_POST['memberID'];

$fileName = $file['name'];

// 照片存放的資料夾
$filePath = __DIR__ . "/uploadImages/" . $fileName;

//將暫存檔搬移到正確位置
move_uploaded_file($file['tmp_name'], $filePath);

// 建立要存到資料庫的圖檔路徑字串
$imagePath = "/pdo/Member/uploadImages/" . $fileName;

//建立SQL
$sqlImg = "UPDATE Member 
              SET image=:image 
              WHERE ID=:id";

$statementImg = $pdo -> prepare($sqlImg);
$statementImg -> bindParam(":image", $imagePath);

$statementImg->bindParam(":id", $memberID);

// 執行新增圖片
$statementImg -> execute();

// if (!is_dir($saveDir) && !@mkdir($saveDir, 0755, true)) {
//   echo json_encode(['success'=>false,'message'=>'無法建立上傳目錄'], JSON_UNESCAPED_UNICODE);
//   exit;
// };

// $fname    = 'avatar_' . time() . '_' . bin2hex(random_bytes(4)) . '.' . $ext;
// $destPath = $saveDir . $fname;
// $relPath  = $publicRel . $fname;

// 直接搬原檔（不壓縮、不轉檔）
// if (!@move_uploaded_file($file['tmp_name'], $destPath)) {
//   echo json_encode(['success'=>false,'message'=>'存檔失敗（move_uploaded_file）'], JSON_UNESCAPED_UNICODE);
//   exit;
// }

// // 更新 DB（Member.image），並刪除舊檔（同 uid 目錄內）
// try {
//     $st = $pdo->prepare('SELECT image FROM `Member` WHERE ID=:id LIMIT 1');
//     $st->execute([':id'=>$uid]);
//     $old = $st->fetch(PDO::FETCH_ASSOC);
//     $oldPath = $old && !empty($old['image']) ? $old['image'] : null;

//     $up = $pdo->prepare('UPDATE `Member` SET image=:img WHERE ID=:id');
//     $ok = $up->execute([':img'=>$relPath, ':id'=>$uid]);

//     if (!$ok) {
//         @unlink($destPath);
//         echo json_encode(['success'=>false,'message'=>'更新資料庫失敗'], JSON_UNESCAPED_UNICODE);
//         exit;
//     }

//     // 刪除舊檔（僅限自己目錄）
//     if ($oldPath) {
//         $oldAbs = $rootDir . '/' . ltrim($oldPath, '/');
//         $safe   = realpath($rootDir . '/uploads/avatars/' . $uid . '/');
//         $oldRp  = realpath($oldAbs);
//         if ($safe && $oldRp && strpos($oldRp, $safe) === 0) @unlink($oldRp); 
//     }

// } catch (Throwable $e) {
//     @unlink($destPath);
//     echo json_encode(['success'=>false,'message'=>'伺服器錯誤：'.$e->getMessage()], JSON_UNESCAPED_UNICODE);
//     exit;
// }

// 成功
echo json_encode([
    'success' => true,
    'message' => '頭貼已更新',
    'data'    => [
        // 'avatarUrl'      => $relPath,       // 相對路徑，前端用 url() 補成完整
        'avatarUrl' => $imagePath,
        'cacheBustParam' => time()         // 前端用 ?v= 用
    ],
], JSON_UNESCAPED_UNICODE);


















?>