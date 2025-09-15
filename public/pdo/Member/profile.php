<?php

include '../pdo.php';

// 預檢請求
// if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
//   exit;
// }

// 只接受 GET
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
  echo json_encode(['success' => false, 'message' => '請用 GET 讀取'], JSON_UNESCAPED_UNICODE);
  exit;
}

session_start();

// 直接用 Session 判斷登入
$memberID = isset($_SESSION['memberID']) ? (int)$_SESSION['memberID'] : 0;

// 兩者都沒有就視為未登入
if ($memberID === 0) {
  echo json_encode(['success' => false, 'message' => '尚未登入'], JSON_UNESCAPED_UNICODE);
  exit;
}

try {
  // 讀取目前登入者的基本資料
  $st = $pdo->prepare('SELECT ID, name, email, phone, city, area, address, gender, image, created_at, account_status
                       FROM Member
                       WHERE ID = ?
                       LIMIT 1');
  $st->execute([$memberID]);
  $row = $st->fetch(PDO::FETCH_ASSOC); // 明確用關聯陣列，避免不同 PDO 預設造成行為差異

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