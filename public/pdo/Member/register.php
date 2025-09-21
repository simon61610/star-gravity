<?php

include '../pdo.php';

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
        '正常',
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