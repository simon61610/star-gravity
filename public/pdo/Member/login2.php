<?php
include '../pdo.php';

// header('Content-Type: application/json; charset=utf-8');
ini_set('display_errors', '0');
error_reporting(E_ALL);

// header('Access-Control-Allow-Credentials: true');
// header('Access-Control-Allow-Origin: http://localhost:5173');
// header('Access-Control-Allow-Methods: POST, OPTIONS');
// header('Access-Control-Allow-Headers: Content-Type, X-Requested-With, Authorization');

session_start();
// $data = json_decode(file_get_contents("php://input"), true) ;

// 預檢與方法限制（避免 CORS 預檢卡住、或誤用 GET）
// if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { 
//     exit; 
// };
// if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
//     echo json_encode(['success'=>false,'message'=>'請用 POST']); 
//     exit;
// };

// CORS 預檢
/* if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'OPTIONS') { 
    exit;
} */

// 讀取與檢查輸入（避免 $data 為 null 造成 undefined index）
$raw  = file_get_contents('php://input');   // 拿前端送來的字串
$data = json_decode($raw, true) ?: [];      // 轉成陣列；解析不到給空陣列
$email    = isset($data['email']) ? trim($data['email']) : '';
$password = isset($data['password']) ? trim($data['password']) : '';

if ($email === '' || $password === '') {
    echo json_encode(['success'=>false,'message'=>'缺少 email 或 password']); exit;
};

// $sql = 'SELECT * from Member
//         where email = :email and password = :password
//     ';

// 查會員
$sql = 'SELECT * FROM Member 
        WHERE email = :email AND password = :password LIMIT 1
        ';
$stmt = $pdo->prepare($sql);
$stmt->bindValue(':email', $email);
$stmt->bindValue(':password', $password);
$stmt->execute();
// $stmt->bindValue( ":email" , $data["email"]);
// $stmt->bindValue( ":password" , $data["password"]);

// $member = $stmt->fetchAll();
$member = $stmt->fetch(PDO::FETCH_ASSOC); // 直接拿一筆關聯陣列

// if( !empty($member) ){
//     echo json_encode([
//         'success' => true,
//         'message' => '登入成功',
//         'user' => $member
//     ]);
// }else{
//     echo json_encode([
//         'success' => false,
//         'message' => '帳號密碼輸入錯誤'
//     ]);
//     exit;
    
// }

if(!$member) {
    echo json_encode([
        'success' => false,
        'message' => '帳號密碼輸入錯誤'
    ]);
    exit;
};

// 安全：登入成功時重新產生 Session ID，避免 Session 固定攻擊
session_regenerate_id(true);

// 建立 Session：之後可用 $_SESSION['memberID'] 辨識
$_SESSION['memberID'] = (int)$member['ID'];

// 產生 Token（存在 Tokens 表）；前端也會存到 localStorage('token')
function create_token($length = 32) {
    if (function_exists('random_bytes')) return bin2hex(random_bytes($length));
    if (function_exists('openssl_random_pseudo_bytes')) return bin2hex(openssl_random_pseudo_bytes($length));
    return hash('sha256', uniqid(mt_rand(), true));
}
$token = create_token(32);
$expiresAt = date('Y-m-d H:i:s', time() + 7*24*60*60); // 7 天有效
// $expiresAt = date('Y-m-d H:i:s', time() + 5*60);    // 測試用


// 寫入 Tokens 資料表
// $ins = 'INSERT INTO `Tokens` (member_id, token, expires_at) 
//         VALUES (:mid, :tok, :exp)
//         ';

$ins = $pdo->prepare('INSERT INTO `Tokens` (member_id, token, expires_at) 
                    VALUES (:mid, :tok, :exp)
                    '); // 用 prepare 回傳 PDOStatement
$ok = $ins->execute([
    ':mid' => $member['ID'],
    ':tok' => $token,
    ':exp' => $expiresAt
]);   

// 防呆：若寫入 token 失敗就回錯誤訊息
if (!$ok) {
    echo json_encode([
        'success'=>false,
        'message'=>'建立 token 失敗'
    ]); 
    exit;
};

// 回傳前「保險」清空緩衝，避免 BOM/多餘輸出破壞 JSON（若沒開輸出緩衝會無事）
while (ob_get_level()) { 
    ob_end_clean(); 
} 

// 同時回 user 與 token；前端可以同時用 Session + Token
echo json_encode([
    'success' => true,
    'message' => '登入成功',
    'token'   => $token,
    'user'    => [
        'ID'      => (int)$member['ID'],
        'email'   => $member['email'] ?? '',
        'name'    => $member['name'] ?? '',
        'phone'   => $member['phone'] ?? '',
        'city'    => $member['city'] ?? '',
        'area'    => $member['area'] ?? '',
        'address' => $member['address'] ?? '',
    ]
]);
exit;






?>