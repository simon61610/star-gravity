<?php
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

// 取得登入會員 ID
session_start();
// $uid = (int)($_SESSION['memberID'] ?? 0);
// 只相信 Session，切勿用前端傳來的 memberID
// $memberID = isset($_SESSION['memberID']) ? (int)$_SESSION['memberID'] : 0;
$memberID = isset($_SESSION['memberID']) ? (int)$_SESSION['memberID'] : 0;   // 安全：不再讀 POST 的 memberID

if ($memberID === 0) {
  echo json_encode(['success' => false, 'message' => '尚未登入'], JSON_UNESCAPED_UNICODE);
  exit;
};

// 取檔案
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

// 檢查型別：先用 fileinfo，失敗就用簡單 magic number 檢查
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



// $memberID = $_POST['memberID'];

// $fileName = $file['name'];

// // 照片存放的資料夾
// $filePath = __DIR__ . "/uploadImages/" . $fileName;

// //將暫存檔搬移到正確位置
// move_uploaded_file($file['tmp_name'], $filePath);

// // 建立要存到資料庫的圖檔路徑字串
// $imagePath = "/pdo/Member/uploadImages/" . $fileName;

// === 正確儲存設定（固定資料夾 + 唯一檔名） ===
// 實體路徑：以目前檔案所在資料夾為基準（Member/）
$saveDir = __DIR__ . '/uploadImages/';               // Member/uploadImages/
if (!is_dir($saveDir)) { @mkdir($saveDir, 0755, true); }

// 產生唯一檔名：avatar_{uid}_{timestamp}_{rand}.{ext}
$fname    = 'avatar_' . $memberID . '_' . time() . '_' . bin2hex(random_bytes(3)) . '.' . $ext;
$destPath = $saveDir . $fname;                        // 實體完整路徑

if (!@move_uploaded_file($file['tmp_name'], $destPath)) {
  echo json_encode(['success'=>false,'message'=>'存檔失敗（move_uploaded_file）'], JSON_UNESCAPED_UNICODE);
  exit;
};

// // + 存到 DB 的字串一律「相對路徑」且不以 `/` 開頭（前端用 new URL() 補全
// 注意大小寫：Member/uploadImages/...
$imagePath = 'Member/uploadImages/' . $fname;

//建立SQL
// $sqlImg = "UPDATE Member 
//               SET image=:image 
//               WHERE ID=:id";
// $statementImg = $pdo -> prepare($sqlImg);
// $statementImg -> bindParam(":image", $imagePath);

// $statementImg->bindParam(":id", $memberID);

// // 執行新增圖片
// $statementImg -> execute();

// 先查舊圖，待會更新成功後刪除
$st = $pdo->prepare('SELECT image 
                    FROM `Member` 
                    WHERE ID=:id 
                    LIMIT 1');
$st->execute([':id'=>$memberID]);
$old = $st->fetch(PDO::FETCH_ASSOC);
$oldRel = $old && !empty($old['image']) ? $old['image'] : null;   // 例如 Member/uploadImages/xxx.jpg

// 寫入新路徑
$up = $pdo->prepare('UPDATE `Member` 
                    SET image=:img 
                    WHERE ID=:id');
$ok = $up->execute([':img'=>$imagePath, ':id'=>$memberID]);

if (!$ok) {
  @unlink($destPath); // DB 失敗就刪掉剛存的新檔
  echo json_encode(['success'=>false,'message'=>'更新資料庫失敗'], JSON_UNESCAPED_UNICODE);
  exit;
};

// 刪除舊檔（安全範圍內、且不是剛上傳的同一檔）
if ($oldRel) {
  $oldAbs   = __DIR__ . '/' . preg_replace('#^/#','', $oldRel); // ~ 允許舊資料含先導 `/`，這裡統一處理 
  $safeBase = realpath($saveDir);                                // 只允許刪除 uploadImages/ 內的檔案
  $oldReal  = file_exists($oldAbs) ? realpath($oldAbs) : null;
  $newReal  = realpath($destPath);
  if ($safeBase && $oldReal && strpos($oldReal, $safeBase) === 0 && $oldReal !== $newReal) {
    @unlink($oldReal);               // 實際刪除舊檔（且不等於新檔
  }
};


// 成功
echo json_encode([
    'success' => true,
    'message' => '頭貼已更新',
    'data'    => [
        'avatarUrl' => $imagePath,
        'cacheBustParam' => time()         // 前端用 ?v= 用
    ],
], JSON_UNESCAPED_UNICODE);


















?>