<?php
include('../pdo.php');
// include('cors.php');
// include('db.php');


$data = json_decode(file_get_contents("php://input"), true);

$ID = $data['ID'] ?? null ;
$category = $data['category'] ?? '';
$is_active = $data['is_active'] ?? '';
$title = $data['title'] ?? '';
$image = $data['image'] ?? '';
$content = $data['content'] ?? '';



//建立SQL語法

$sql = "UPDATE Article SET `category`= ?,`is_active`= ? , `title`=? , `image`=? , `content`=? ,
  where `id` = ? ";


//執行並查詢，會回傳查詢結果的物件
$statement = $pdo->prepare($sql);
$statement -> bindValue(1,$category);
$statement -> bindValue(2,$is_active);
$statement -> bindValue(3,$title);
$statement -> bindValue(4,$image);
$statement -> bindValue(5,$content);
$statement -> bindValue(6,$ID);
$statement -> execute();
// $statement -> execute([$category, $is_active, $title, $image, $content, $tags, $ID]);


$respbody['success'] = true;
$respbody['message'] = '修改成功';
//處理回傳的結果
echo json_encode($respbody); 

















 ?>