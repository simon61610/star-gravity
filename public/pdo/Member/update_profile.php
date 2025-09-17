<?php

// header('Content-Type: application/json; charset=utf-8');

include '../pdo.php';

// 處理預檢請求
// if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
//   exit; 
// }

// 只允許 POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  echo json_encode(['success' => false, 'message' => '請用 POST 更新'], JSON_UNESCAPED_UNICODE);
  exit;
}

// 同時支援 Session / Token
session_start();
// $uid = (int)($_SESSION['memberID'] ?? 0);
$memberID = isset($_SESSION['memberID']) ? (int)$_SESSION['memberID'] : 0;

// 兩者都沒有 → 視為未登入
if ($uid === 0) {
  echo json_encode(['success' => false, 'message' => '尚未登入'], JSON_UNESCAPED_UNICODE);
  exit;
}

// 讀取輸入資料（前端傳來 JSON）
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
  $data = $_POST;        // 如果不是 JSON，就試 POST
}

// 取欄位
$name    = trim($data['name'] ?? '');
$phone   = trim($data['phone'] ?? '');
$city    = trim($data['city'] ?? '');
$area    = trim($data['area'] ?? '');
$address = trim($data['address'] ?? '');

// 簡單必填檢查（你要的可以自行放寬/加強）
if ($name === '' || $phone === '') {
  echo json_encode([
    'success' => false,
    'message' => '請輸入完整資料',
    'debug'   => ['uid'=>$uid, 'got'=>$data]
  ], JSON_UNESCAPED_UNICODE);
  exit;
}

// 更新當前登入會員資料
try {
  $sql = 'UPDATE `Member`
          SET name=:name, phone=:phone, city=:city, area=:area, address=:address
          WHERE ID=:id';
  $st = $pdo->prepare($sql);
  $ok = $st->execute([
    ':name' => $name,
    ':phone' => $phone,
    ':city' => $city,
    ':area' => $area,
    ':address' => $address,
    ':id' => $memberID
  ]);

  // 回傳 rowCount 幫你判斷是否真的有變更
  echo json_encode([
    'success' => $ok,
    'message' => $ok ? '已更新' : '更新失敗',
    'rows'    => $st->rowCount(),
    'debug'   => ['uid'=>$uid, 'got'=>$data]
  ], JSON_UNESCAPED_UNICODE);

  } catch (PDOException $e) {
    echo json_encode(['success'=>false, 'message'=>'伺服器錯誤：'.$e->getMessage()], JSON_UNESCAPED_UNICODE);
}



?>