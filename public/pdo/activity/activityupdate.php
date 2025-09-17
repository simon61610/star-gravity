<?php
header('Content-Type: application/json; charset=utf-8');
// header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
// header("Access-Control-Allow-Headers: Content-Type");
include('../pdo.php');

// 接收前端傳來的 JSON
$data = json_decode(file_get_contents("php://input"), true);

$id = $data['ID'] ?? 0;  // 編輯時一定要有 id
$event_name = $data['event_name'] ?? '';
$event_start = $data['event_start'] ?? '';
$event_end = $data['event_end'] ?? '';
$event_deadline = $data['event_deadline'] ?? '';
$event_place = $data['event_place'] ?? '';
$event_description = $data['event_description'] ?? '';
$event_price = (int)($data['event_price'] ?? 0);
$max_joiners = isset($data['max_joiners']) && $data['max_joiners'] !== ''
                    ? (int)$data['max_joiners']
                    : null;
$is_active = $data['is_active'] ?? '';
$event_status = $data['event_status'] ?? '';
$homepage_highlight = $data['homepage_highlight'] ?? ''; 
$image = $data['image'] ?? '';
$tag = $data['tag'] ?? '';
$category = $data['category'] ?? '';

// 圖片陣列轉 JSON
$imageJson = json_encode($image, JSON_UNESCAPED_SLASHES);

// 準備 SQL
$sql = "UPDATE `Event` SET 
            event_name = ?,
            event_start = ?,
            event_end = ?,
            event_deadline = ?,
            event_place = ?,
            event_price = ?,
            max_joiners = ?,
            event_description = ?,
            is_active = ?,
            event_status = ?,
            homepage_highlight = ?,
            image = ?,
            tag = ?,
            category = ?
        WHERE id = ?";

$statement = $pdo->prepare($sql);
$statement->bindValue(1, $event_name);
$statement->bindValue(2, $event_start);
$statement->bindValue(3, $event_end);
$statement->bindValue(4, $event_deadline);
$statement->bindValue(5, $event_place);
$statement->bindValue(6, $event_price);
$statement->bindValue(7, $max_joiners, is_null($max_joiners) ? PDO::PARAM_NULL : PDO::PARAM_INT);
$statement->bindValue(8, $event_description);
$statement->bindValue(9, $is_active);
$statement->bindValue(10, $event_status);
$statement->bindValue(11, $homepage_highlight);
$statement->bindValue(12, $imageJson);
$statement->bindValue(13, $tag);
$statement->bindValue(14, $category);
$statement->bindValue(15, $id);

$success = $statement->execute();

if($success){
    $respbody = [
        "success" => true,
        "message" => "更新資料成功",
        "ID" => $id,
        "event_name" => $event_name,
        "event_start"=>$event_start,
        "event_end"=>$event_end,
        "event_deadline" => $event_deadline,
        "event_place" => $event_place,
        "event_price"=>$event_price,
        "max_joiners"=>$max_joiners,
        "event_description" => $event_description,
        "is_active" => $is_active,
        "event_status" => $event_status,
        "homepage_highlight" => $homepage_highlight,
        "image" => $image,
        "tag" => $tag,
        "category" => $category
    ];
}else{
    $respbody = [
        "success" => false,
        "message" => "更新失敗"
    ];
}

echo json_encode($respbody, JSON_UNESCAPED_UNICODE);
?>
