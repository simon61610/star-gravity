<?php

include '../pdo.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Requested-With, Authorization');

// 如果是「預檢請求 (OPTIONS)」，直接結束，不做處理
if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'OPTIONS') { 
    exit;
};

// 從 Header 抓 Authorization
$auth = $_SERVER['HTTP_AUTHORIZATION'] ?? '';  // 讀取前端傳的 "Authorization" 標頭
$token = '';

// 如果有帶 "Bearer " 開頭 → 取出後面的 token
if (strpos($auth, 'Bearer ') === 0) {
    $token = substr($auth, 7);   // 去掉前面的 "Bearer "
    $token = trim($token);       // 去除空白
};

// 如果沒有帶 token → 回傳錯誤 JSON
if ($token === '') {
    echo json_encode([
        'valid' => false, 
        'message' => '缺少 token'
    ]);
    exit;
};

// 去資料庫查 token 是否存在 & 是否還沒過期
$sql = "SELECT member_id, expires_at 
        FROM Tokens 
        WHERE token = :tok 
        LIMIT 1
        ";
$stmt = $pdo->prepare($sql);
$stmt->execute([':tok' => $token]);
$row = $stmt->fetch(PDO::FETCH_ASSOC);

// 如果查不到 → 無效的 token
if (!$row) {
    echo json_encode([
        'valid' => false, 
        'message' => '無效的 token'
    ]);
    exit;
};

// 檢查 token 是否過期
$now = date('Y-m-d H:i:s');
if ($row['expires_at'] < $now) {
    echo json_encode([
        'valid' => false, 
        'message' => 'token 已過期'
    ]);
    exit;
};

// 成功 → 回傳會員資訊 (或至少告訴前端 valid=true)
echo json_encode([
    'valid' => true,    // 驗證成功
    'member_id' => (int)$row['member_id'],
    'message' => 'token 有效'
]);
exit;

?>