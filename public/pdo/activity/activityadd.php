<?php
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
include('../pdo.php');

// 處理 OPTIONS 預檢請求，直接回應 200
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// include('cors.php');
// include('db.php');

$data = json_decode(file_get_contents("php://input"), true);
var_dump($data);
$event_name = $data['event_name'] ?? '';
$event_start = $data['event_start'] ?? '';
$event_end = $data['event_end'] ?? '';
$event_deadline = $data['event_deadline'] ?? '';
$event_place = $data['event_place'] ?? '';
$event_price = (int)($data['event_price'] ?? 0);
$event_description = $data['event_description'] ?? '';
$is_active = $data['is_active'] ?? '';
$event_status = $data['event_status'] ?? '';
$homepage_highlight = $data['homepage_highlight'] ?? 0; 
$image = $data['image'] ?? '';
$tag = $data['tag'] ?? '';
$category = $data['category'] ?? '';

// 轉成 JSON 存 DB
$imageJson = json_encode($image, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE ); //不要把 / 轉成 \/  ||  不要把中文轉成 \uXXXX
//建立SQL語法

$sql = "INSERT INTO  `Event`(event_name, event_start, event_end ,event_deadline , event_place ,event_price,  event_description , is_active , event_status, homepage_highlight ,image , tag , category) VALUES 
(?, ?, ?, ?, ?, ?, ?, ? , ?, ? , ?,?,?)" ;


//執行並查詢，會回傳查詢結果的物件
$statement = $pdo->prepare($sql);
$statement -> bindValue(1,$event_name);
$statement -> bindValue(2,$event_start);
$statement -> bindValue(3,$event_end);
$statement -> bindValue(4,$event_deadline);
$statement -> bindValue(5,$event_place);
$statement -> bindValue(6,$event_price);
$statement -> bindValue(7,$event_description);
$statement -> bindValue(8,$is_active);
$statement -> bindValue(9,$event_status);
$statement -> bindValue(10,$homepage_highlight);
$statement -> bindValue(11,$imageJson);
$statement -> bindValue(12,$tag);
$statement -> bindValue(13,$category);
$statement -> execute();


//取得流水號
$newId = $pdo->lastInsertId();


if($newId > 0){
    $respbody = [
    "success" => true,
    "message" => "新增資料成功",
    "ID"=>$newId,
    "event_name" => $event_name,
    "event_start"=>$event_start,
    "event_end"=>$event_end,
    "event_deadline"=>$event_deadline,
    "event_place"=>$event_place,
    "event_description"=>$event_description,
    "is_active"=>$is_active,
    "event_status"=>$event_status,
    "homepage_highlight"=>$homepage_highlight,
    "image"=>$image,
    "tag" =>$tag,
    "category"=>$category, ];

}else{
    // 新增失敗
    $respbody = [
        "success" => false,
        "message" => "新增資料失敗"
    ];
}


//處理回傳的結果
echo json_encode($respbody,JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES); 

?>