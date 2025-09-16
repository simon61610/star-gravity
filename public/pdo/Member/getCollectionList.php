<?php

include '../pdo.php';

$data = json_decode(file_get_contents("php://input"), true);

$memberId = (int)($data['memberId'] ?? 0);

if($memberId <= 0) {
    echo json_encode([], JSON_UNESCAPED_UNICODE);
    exit;
};

// 建立sql
$sql = "SELECT p.name, p.original_price,
        (
            SELECT pi.image
            FROM ProductImage pi
            WHERE pi.product_id = p.ID
            ORDER BY pi.ID ASC
            LIMIT 1
        ) AS photo_url
        FROM Favorite f
        JOIN Member m ON f.member_id = m.ID
        JOIN Product p ON f.product_id = p.ID
        WHERE m.ID = :memberId;";

$statement = $pdo->prepare($sql);
// $statement->bindValue(':memberId', $memberId, PDO::PARAM_INT);
$statement->bindValue(':memberId', $data["memberId"]);
$result = $statement->execute();

// echo $result;

$products = $statement->fetchAll();
// $events = $stmt->fetchAll(PDO::FETCH_ASSOC);

// print_r($events);

//格式化輸出
// $out = [];
// foreach ($events as $e) {
//     $out[] = [
//         'event_name' => $e['event_name'],
//         // 'event_date'   => $e['event_date'],
//         'event_place'  => $e['event_place'],
//         'event_status' => $e['event_status'],
//         'registration_number' => $e['registration_number'],
//         'registration_date' => $e['registration_date']
//     ];
// };

echo json_encode($products, JSON_UNESCAPED_UNICODE);












?>