<?php

include '../pdo.php';

$data = json_decode(file_get_contents("php://input"), true);


// echo 123;
// 
// echo json_encode([
//     "message" => "Hello"
// ]);

$memberId = (int)($data['memberId'] ?? 0);

if($memberId <= 0) {
    echo json_encode([], JSON_UNESCAPED_UNICODE);
    exit;
};

// 建立sql
$sql = "SELECT j.* , e.event_name, e.event_place, e.event_status
        from Joiner j
        join Event e on j.event_id = e.ID 
        WHERE j.member_id = :memberId  
        ";

$statement = $pdo->prepare($sql);
$statement->bindValue(':memberId', $memberId, PDO::PARAM_INT);
// $statement->bindValue(':memberId', $data["memberId"]);
$result = $statement->execute();

// echo $result;

$events = $statement->fetchAll();
// $events = $stmt->fetchAll(PDO::FETCH_ASSOC);

// print_r($events);

//格式化輸出
$out = [];
foreach ($events as $e) {
    $out[] = [
        'event_name' => $e['event_name'],
        // 'event_date'   => $e['event_date'],
        'event_place'  => $e['event_place'],
        'event_status' => $e['event_status'],
        'registration_number' => $e['registration_number'],
        'registration_date' => $e['registration_date']
    ];
};

echo json_encode($out, JSON_UNESCAPED_UNICODE);












?>