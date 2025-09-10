<?php

include '../pdo.php';

header('Content-Type: application/json; charset=utf-8');

// 簡化 CORS，允許所有本機請求
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Requested-With, Authorization');

// 預檢請求直接結束，避免被下面的「僅允許 POST」誤擋
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
    exit;
};

// 僅允許 POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  echo json_encode(['ok' => false, 'message' => '請用 POST 提交'], JSON_UNESCAPED_UNICODE);
  exit;
};

// 初始化錯誤陣列
$errors = [];

//  讀取表單欄位（
$name = trim($_POST['name'] ?? $_POST['username'] ?? '');
$email    = trim($_POST['email'] ?? '');
$password = $_POST['password'] ?? '';
$phone    = trim($_POST['phone'] ?? '');
$city     = trim($_POST['city'] ?? '');
$area     = trim($_POST['area'] ?? '');
$address  = trim($_POST['address'] ?? '');
$gender   = trim($_POST['gender'] ?? '');

// 基本驗證
$errors = [];
if ($name === '') $errors[] = '請輸入姓名';
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = '請輸入有效 Email';
if ($password === '' || mb_strlen($password) < 6) $errors[] = '密碼至少 6 碼';
if ($phone === '') $errors[] = '請輸入電話';
if ($city === '') $errors[] = '請選擇縣市';
if ($area === '') $errors[] = '請輸入鄉鎮';
if ($address === '') $errors[] = '請輸入地址';
if ($gender === '') $errors[] = '請選擇性別';

if ($errors) {
  echo json_encode(['ok' => false, 'errors' => $errors], JSON_UNESCAPED_UNICODE);
  exit;
};

// 圖片上傳
$imagePath = ''; // 預設空字串
// if (!empty($_FILES['image']) && is_uploaded_file($_FILES['image']['tmp_name'])) 
// 先檢查是否有檔案、是否上傳成功
// if (!empty($_FILES['image'])) {
//   $f = $_FILES['image'];

//     // 上傳 error code
//     if (!isset($f['error']) || $f['error'] !== UPLOAD_ERR_OK) {
//     http_response_code(422);
//     echo json_encode(['ok' => false, 'message' => '圖片上傳失敗（error code: ' . ($f['error'] ?? 'unknown') . '）'], JSON_UNESCAPED_UNICODE);
//     exit;
//     }
    // 確認檔案是以 HTTP POST 上傳
//     if (!is_uploaded_file($f['tmp_name'])) {
//     http_response_code(422);
//     echo json_encode(['ok' => false, 'message' => '非法的上傳來源'], JSON_UNESCAPED_UNICODE);
//     exit;
//     }

//     // 檔案大小限制：2MB
//     if ($f['size'] > 2 * 1024 * 1024) {
//         http_response_code(422);
//         echo json_encode(['ok' => false, 'message' => '圖片大小不可超過 2MB'], JSON_UNESCAPED_UNICODE);
//         exit;
//     }
//     // 檔案 MIME
//     $finfo = finfo_open(FILEINFO_MIME_TYPE);
//     $mime  = finfo_file($finfo, $f['tmp_name']);
//     finfo_close($finfo);

//     $allowed = ['image/jpeg','image/png','image/webp'];
//     if (!in_array($mime, $allowed, true)) {
//         http_response_code(422);
//         echo json_encode(['ok' => false, 'message' => '僅允許 JPG/PNG/WebP 圖片'], JSON_UNESCAPED_UNICODE);
//         exit;
//     }
//     // 目的資料夾（相對於這支 PHP）
//   $uploadDir = __DIR__ . '/uploads';
//   if (!is_dir($uploadDir)) {
//     if (!mkdir($uploadDir, 0775, true) && !is_dir($uploadDir)) {
//       http_response_code(500);
//       echo json_encode(['ok' => false, 'message' => '無法建立上傳資料夾'], JSON_UNESCAPED_UNICODE);
//       exit;
//     }
// }
// 產生不重複檔名
// $ext = match ($mime) {
//     'image/jpeg' => '.jpg',
//     'image/png'  => '.png',
//     'image/webp' => '.webp',
//     default      => ''
// };
// if ($mime === 'image/jpeg')      $ext = '.jpg';
// elseif ($mime === 'image/png')   $ext = '.png';
// elseif ($mime === 'image/webp')  $ext = '.webp';
// else                             $ext = '';
// try{
//     $basename  = bin2hex(random_bytes(8)) . $ext;
// } catch (Exception $e) {
//     $basename = uniqid('', true) . $ext;
// }
// $fullpath  = $uploadDir . '/' . $basename;

// if (!move_uploaded_file($f['tmp_name'], $fullpath)) {
//     http_response_code(500);
//     echo json_encode(['ok' => false, 'message' => '圖片儲存失敗'], JSON_UNESCAPED_UNICODE);
//     exit;
//   }
//   // 存相對路徑（提供給前端顯示）
//     //   $imagePath = '/PDO/Member/uploads/' . $basename;
//     $publicUploadsBase = '/uploads';
//     $imagePath = rtrim($publicUploadsBase, '/') . '/' . $basename;
// }



try {
    // 檢查 Email 是否重複
    $st = $pdo->prepare('SELECT ID FROM Member WHERE `email` = ? LIMIT 1');
    $st->execute([$email]);
    if ($st->fetch()) {
        echo json_encode(['ok' => false, 'message' => '此 Email 已被註冊'], JSON_UNESCAPED_UNICODE);
        exit;
    };

    // 密碼雜湊
    $hash = password_hash($password, PASSWORD_DEFAULT);

    // 導入member資料庫
    $sql = 'INSERT INTO `Member`
        (`name`, `email`, `password`, `phone`, `city`, `area`, `address`, `gender`, `image`, `created_at`, `account_status`,`hash`)
        VALUES (?,?,?,?,?,?,?,?,?, NOW(), ?,?)';
    $st = $pdo->prepare($sql);
    $st->execute([
        $name,
        $email,
        $password,
        $phone,
        $city,
        $area,        
        $address,
        $gender,
        $imagePath ?: null,    
        'normal',
        $hash     
    ]);

    // 確保只輸出 JSON（清掉任何意外輸出），避免前端解析失敗
    while (ob_get_level()) { 
        ob_end_clean(); 
    };

    echo json_encode([
        'ok' => true,
        'message' => '註冊成功',
        // 'user_id' => $pdo->lastInsertId(),
        // 'image'   => $imagePath
    ], JSON_UNESCAPED_UNICODE);
    exit;

    } catch (PDOException $e) {
        // 失敗也一律回乾淨 JSON
        echo json_encode(['ok' => false, 'message' => '伺服器錯誤：'.$e->getMessage()], JSON_UNESCAPED_UNICODE);
        exit;
};




?>