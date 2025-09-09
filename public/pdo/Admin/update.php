<?php
// ===== CORS / JSON 基本設定 =====
// header("Access-Control-Allow-Origin: http://localhost:5174");
// header("Access-Control-Allow-Credentials: true");
// header("Access-Control-Allow-Methods: POST, OPTIONS");
// header("Access-Control-Allow-Headers: Content-Type, X-Requested-With, Authorization");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit; }

header('Content-Type: application/json; charset=utf-8');

include('../pdo.php'); // 需提供 $pdo（建議已設 ERRMODE_EXCEPTION）

$data = json_decode(file_get_contents("php://input"), true) ;

// 你先前使用的是大寫表名 `Member`，欄位 `Account`、`account_status`
$sql  = ' UPDATE Member set account_status = :account_status 
          where ID = :id
';
$stmt = $pdo->prepare($sql);
$stmt->bindValue( ":account_status" , $data["account_status"]);
$stmt->bindValue( ":id" , $data["id"]);
$stmt->execute();

$affected = $stmt->rowCount(); 
// echo $affected;

// 取更新後資料（方便前端同步）
$sql2 = ' SELECT * from Member' ;
$stmt2 = $pdo->prepare($sql2);
$stmt2->execute();

$members = $stmt2->fetchAll();
echo json_encode($members);