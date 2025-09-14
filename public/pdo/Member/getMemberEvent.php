<?php

include '../pdo.php';

$data = json_decode(file_get_contents("php://input"), true) ;

$memberId = (int)($data['memberId'] ?? 0);

if($memberId <= 0) {
    echo json_encode([], JSON_UNESCAPED_UNICODE);
    exit;
};

// 建立sql
$sql = "SELECT event_name, 
        DATE_FORMAT(event_start, '%Y-%m-%d %H:%i') AS event_date,
        event_place, event_status
        FROM `Event`
        ORDER BY ID DESC";
$statement = $pdo->prepare($sql);
$statement->bindValue(':memberId', $data["memberId"]);
$statement->execute();

$events = $statement->fetchAll();

// 格式化輸出
$out = [];
foreach ($events as $e) {
    $out[] = [
        'event_name' => $e['event_name'],
        'event_date'   => $e['event_date'],
        'event_place'  => $e['event_place'],
        'event_status' => $e['event_status']
    ];
};

echo json_encode($out, JSON_UNESCAPED_UNICODE);












?>