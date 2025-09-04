<?php
include('../../pdo.php');
// include('cors.php');
// include('db.php');

$data = json_decode(file_get_contents("php://input"), true);
$category = $data['category'] ?? '';
$is_active = $data['is_active'] ?? '';
$title = $data['title'] ?? '';
$image = $data['image'] ?? '';
$content = $data['content'] ?? '';
$tags = $data['tags'] ?? '';

//建立SQL語法

$sql = "INSERT INTO article(category, is_active, title , image , content ,tags) VALUES 
(?, ?, ?, ?, ?,?)" ;


//執行並查詢，會回傳查詢結果的物件
$statement = $pdo->prepare($sql);
$statement -> execute([$category, $is_active, $title, $image, $content, $tags]);

//取得流水號
$newId = $pdo->lastInsertId();


$respbody = [
    "success" => true,
    "message" => 新增資料成功,
    "ID"=>$newId,
    "title" => $title,
    "category"=>$category,
    "is_active" =>$is_active,
    "image"=>$image,
    "content"=>$content, ];
//處理回傳的結果
echo json_encode($respbody); 

?>