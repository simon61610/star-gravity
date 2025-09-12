<?php

header('Content-Type: application/json; charset=utf-8');

include '../pdo.php';

// header('Access-Control-Allow-Origin: http://localhost:5173');
// header('Access-Control-Allow-Credentials: true');
// header('Access-Control-Allow-Methods: POST, OPTIONS');
// header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');

// 處理預檢請求
// if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
//   exit; 
// }

// 只允許 POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  echo json_encode(['success' => false, 'message' => '請用 POST 更新'], JSON_UNESCAPED_UNICODE);
  exit;
}

// 同時支援 Session / Token：先試 Session，沒有再試 Bearer Token
session_start();
$uid = (int)($_SESSION['memberID'] ?? 0);

// 從 Authorization 取 Bearer <token>
if ($uid === 0) {
  $hdr = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
  $tok = (stripos($hdr, 'Bearer ') === 0) ? substr($hdr, 7) : '';
  if ($tok !== '') {
    $ts = 
    'SELECT member_id FROM `Tokens` 
    WHERE token=:t AND expires_at>NOW() LIMIT 1
    ';
    $ts->execute([':t' => $tok]);
    $rowTok = $ts->fetch(PDO::FETCH_ASSOC);
    if ($rowTok) $uid = (int)$rowTok['member_id'];
  }
}

// 兩者都沒有 → 視為未登入
if ($uid === 0) {
  echo json_encode(['success' => false, 'message' => '尚未登入'], JSON_UNESCAPED_UNICODE);
  exit;
}

// 取前端 JSON
$body = json_decode(file_get_contents('php://input'), true) ?: [];
$name    = trim($body['name'] ?? '');
$phone   = trim($data['phone'] ?? '');
$city    = trim($data['city'] ?? '');
$area    = trim($data['area'] ?? '');
$address = trim($data['address'] ?? '');

if (empty($_SESSION['memberID'])) {
    echo json_encode(['ok' => false, 'message' => '尚未登入'], JSON_UNESCAPED_UNICODE);
    exit;
}

// 讀取輸入資料（
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
  $data = $_POST;
}

// $id      = (int)$_SESSION['memberID'];
// $name    = trim($data['name'] ?? '');
// $phone   = trim($data['phone'] ?? '');
// $city    = trim($data['city'] ?? '');
// $area    = trim($data['area'] ?? '');
// $address = trim($data['address'] ?? '');

// 簡單檢查
// if (!$id || $name === '' || $phone === '') {
//   echo json_encode(['ok' => false, 'message' => '請輸入完整資料'], JSON_UNESCAPED_UNICODE);
//   exit;
// }

 // 更新當前登入會員資料
try {
  $sql ='UPDATE `Member`
        SET name=:name, phone=:phone, city=:city, area=:area, address=:address
        WHERE ID=:id
        ';
  $ok = $st->execute([
    ':name' => $name,
    ':phone' => $phone,
    ':city' => $city,
    ':area' => $area,
    ':address' => $address,
    ':id' => $uid
  ]);

  echo json_encode(['success' => $ok, 'message' => $ok ? '已更新' : '更新失敗'], JSON_UNESCAPED_UNICODE);

  } catch (PDOException $e) {
    echo json_encode(['success'=>false, 'message'=>'伺服器錯誤：'.$e->getMessage()], JSON_UNESCAPED_UNICODE);
}










?>