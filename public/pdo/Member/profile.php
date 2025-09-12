<?php

header('Content-Type: application/json; charset=utf-8');
include '../pdo.php';

header("Access-Control-Allow-Origin: http://localhost:5173");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Requested-With, Authorization');

// 預檢請求
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  exit;
}

// 只接受 GET
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
  echo json_encode(['success' => false, 'message' => '請用 GET 讀取'], JSON_UNESCAPED_UNICODE);
  exit;
}

session_start();

// 先從 Session 取，沒有的話再嘗試用 Token
$memberID = isset($_SESSION['memberID']) ? (int)$_SESSION['memberID'] : 0;

// 取 Bearer Token
function bearer_token() {
  $hdr = $_SERVER['HTTP_AUTHORIZATION'] ?? ($_SERVER['Authorization'] ?? '');
  if (!$hdr && function_exists('getallheaders')) {
    $all = getallheaders();
    if (isset($all['Authorization'])) $hdr = $all['Authorization'];
  }
  if (stripos($hdr, 'Bearer ') === 0) return substr($hdr, 7);
  return '';
}
// function bearer_token() {
//   $hdr = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
//   if (stripos($hdr, 'Bearer ') === 0) return substr($hdr, 7);
//   return '';
// }

// 若沒有 Session，且帶了 Token，就用 Tokens 表找出 member_id
if ($memberID === 0) {
  $tok = bearer_token();
  if ($tok !== '') {
    $ts = $pdo->prepare('SELECT member_id
                        FROM `Tokens`
                        WHERE token = :t AND expires_at > NOW()
                        LIMIT 1');
  $ts->execute([':t' => $tok]);
  $rowTok = $ts->fetch(PDO::FETCH_ASSOC);
  if ($rowTok) $memberID = (int)$rowTok['member_id'];
    // $ts = 'SELECT member_id FROM `Tokens` 
    //       WHERE token=:t AND expires_at>NOW() LIMIT 1
    //       ';
    // $ts->execute([':t'=>$tok]);
    // $rowTok = $ts->fetch(PDO::FETCH_ASSOC);
  }
}

// 兩者都沒有就視為未登入
if ($memberID === 0) {
  echo json_encode(['success' => false, 'message' => '尚未登入'], JSON_UNESCAPED_UNICODE);
  exit;
}
// 沒有登入（沒有 Session）
// if (empty($_SESSION['memberID'])) {
//   echo json_encode(['ok' => false, 'message' => '尚未登入'], JSON_UNESCAPED_UNICODE);
//   exit;
// }

// $memberID = (int)$_SESSION['memberID'];


try {
  // 讀取目前登入者的基本資料
  $st = $pdo->prepare('SELECT ID, name, email, phone, city, area, address, gender, image, created_at, account_status
                       FROM Member
                       WHERE ID = ?
                       LIMIT 1');
  $st->execute([$memberID]);
  $row = $st->fetch();

  if (!$row) {
    echo json_encode(['success' => false, 'message' => '找不到會員資料'], JSON_UNESCAPED_UNICODE);
    exit;
  }

  // 組回傳（照你前端需要的欄位）
  $user = [
    'ID'      => (int)$row['ID'],
    'name'    => $row['name'] ?? '',
    'email'   => $row['email'] ?? '',
    'phone'   => $row['phone'] ?? '',
    'city'    => $row['city'] ?? '',
    'area'    => $row['area'] ?? '',
    'address' => $row['address'] ?? '',
    // 可用可不用：下面先保留
    'gender'         => $row['gender'] ?? '',
    'image'          => $row['image'] ?? '',
    'created_at'     => $row['created_at'] ?? '',
    'account_status' => $row['account_status'] ?? 'normal',
  ];

  echo json_encode(['success' => true, 'user' => $user], JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {
  echo json_encode(['success' => false, 'message' => '伺服器錯誤：' . $e->getMessage()], JSON_UNESCAPED_UNICODE);
}


?>