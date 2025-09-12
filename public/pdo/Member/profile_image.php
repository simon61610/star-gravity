<?php

include '../pdo.php';

if (session_status() !== PHP_SESSION_ACTIVE) session_start();

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    echo json_encode(['success'=>false,'message'=>'請用 POST 上傳'], JSON_UNESCAPED_UNICODE);
    exit;
}

// 驗證（先 Session 再 Bearer）
function auth_member_id(PDO $pdo): int {
    $uid = (int)($_SESSION['memberID'] ?? 0);
    if ($uid > 0) return $uid;

    $hdr = $_SERVER['HTTP_AUTHORIZATION'] ?? ($_SERVER['Authorization'] ?? '');
    if (!$hdr && function_exists('apache_request_headers')) {
        $h = apache_request_headers();
        $hdr = $h['Authorization'] ?? '';
    }
    if (stripos($hdr, 'Bearer ') !== 0) return 0;

    $tok = trim(substr($hdr, 7));
    if ($tok === '') return 0;

    $stmt = $pdo->prepare("SELECT member_id 
                        FROM Tokens 
                        WHERE token=:t AND expires_at>NOW() 
                        LIMIT 1
                        ");
    $stmt->execute([':t'=>$tok]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    return $row ? (int)$row['member_id'] : 0;
};

$uid = auth_member_id($pdo);
if ($uid <= 0) { 
    echo json_encode(['success'=>false,'message'=>'未登入']); 
    exit; 
};

// === 檢查檔案 ===
if (!isset($_FILES['avatar'])) {
  echo json_encode(['success'=>false,'message'=>'缺少檔案欄位 avatar']); 
  exit;
};

$file = $_FILES['avatar'];
if ($file['error'] !== UPLOAD_ERR_OK) {
  echo json_encode(['success'=>false,
  'message'=>'上傳失敗，錯誤碼：'
  .$file['error']]); 
  exit;
};

$mime  = $file['type'] ?? '';  // 檔案種類
$size = (int)$file['size'] ?? 0;  // 檔案尺寸
$okMime = ['image/jpeg','image/png','image/webp'];
if (!in_array($mime , $okMime, true)) {
  echo json_encode(['success'=>false,'message'=>'只允許 JPG / PNG / WebP']); 
  exit;
};

if ($size > 2 * 1024 * 1024) {
  echo json_encode(['success'=>false,'message'=>'圖片大小不得超過 2MB']); 
  exit;
};

// === 路徑 ===
$ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
if (!in_array($ext, ['jpg','jpeg','png','webp'], true)) {
  $ext = $mime === 'image/png' ? 'png' : ($mime === 'image/webp' ? 'webp' : 'jpg');
};

$uploadDir = __DIR__ . '/uploadImages/';
if (!is_dir($uploadDir)) @mkdir($uploadDir, 0755, true);

$filename = $uid . '_' . time() . '_' . bin2hex(random_bytes(4)) . '.' . $ext; // 加隨機碼：避免同秒上傳檔名撞到
$dest = $uploadDir . $filename;
$webPath = '/pdo/Member/uploadImages/' . $filename; // 存資料庫用

// === 寫入資料庫 ===
try {
    $pdo->beginTransaction();

    // 找舊圖
    $stmtOld = $pdo->prepare("SELECT image 
                            FROM Member 
                            WHERE ID=:id 
                            LIMIT 1
                            ");
    $stmtOld->execute([':id'=>$uid]);
    $oldImage = $stmtOld->fetchColumn();

    // 搬檔
    if (!move_uploaded_file($file['tmp_name'], $dest)) {
        $pdo->rollBack();
        echo json_encode(['success'=>false,'message'=>'存檔失敗']); 
        exit;
    };

    // 更新 DB
    $stmt = $pdo->prepare("UPDATE Member 
                        SET image=:img 
                        WHERE ID=:id
                        ");
    $stmt->execute([':img'=>$webPath, ':id'=>$uid]);

    $pdo->commit();

    // 刪舊圖（非關鍵）
    if ($oldImage) {
        // 更安全、更不易踩到 Windows 斜線問題：
        // 只取檔名，用現在的上傳資料夾組合，確保只刪自己資料夾內的檔案
        $safeOld = basename($oldImage);                 // 例如 '/pdo/Member/uploadImages/abc.jpg' → 'abc.jpg'
        $oldAbs  = $uploadDir . $safeOld;               // 組出實體路徑
        if (is_file($oldAbs)) @unlink($oldAbs);
    };
    
    echo json_encode([
        'success'=>true,
        'message'=>'頭像已更新',
        'image'=>$webPath,
        'version'=>time(),
        'updated'=>$affected,   // 告訴前端這次 UPDATE 影響幾筆
        'uid'=>$uid             // 實際更新到哪個會員 ID，幫你確認是不是更新錯人/錯 
    ], JSON_UNESCAPED_UNICODE);

} catch (Throwable $e) {
    if ($pdo->inTransaction()) $pdo->rollBack();
    if (is_file($dest)) @unlink($dest);
    echo json_encode([
        'success'=>false,
        'message'=>'伺服器錯誤',
        'error'=>$e->getMessage()   // 除錯時可先打開，穩定後再註解
    ], JSON_UNESCAPED_UNICODE);
};










?>