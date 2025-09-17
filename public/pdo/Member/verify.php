<?php

include '../pdo.php';

// 兼容各環境的 Authorization 讀取
// function getAuthorizationHeader(): string {
//     if (!empty($_SERVER['HTTP_AUTHORIZATION'])) {
//         return $_SERVER['HTTP_AUTHORIZATION'];
//     }
//     if (!empty($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])) {
//         return $_SERVER['REDIRECT_HTTP_AUTHORIZATION'];
//     }
//     if (function_exists('getallheaders')) {
//         $headers = getallheaders();
//         if (isset($headers['Authorization']) && $headers['Authorization'] !== '') {
//             return $headers['Authorization'];
//         }
//         if (isset($headers['authorization']) && $headers['authorization'] !== '') {
//             return $headers['authorization'];
//         }
//     }
//     return '';
// }

$auth = getAuthorizationHeader();
$token = '';
// // 如果有帶 "Bearer " 開頭 → 取出後面的 token
// if (strpos($auth, 'Bearer ') === 0) {
//     $token = substr($auth, 7);   // 去掉前面的 "Bearer "
//     $token = trim($token);       // 去除空白
// };

// 如果沒有帶 token → 回傳錯誤 JSON
if ($token === '') {
    echo json_encode([
        'valid' => false, 
        'reason' => 'no-token',
        'message' => '缺少 token'
    ] JSON_UNESCAPED_UNICODE);
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