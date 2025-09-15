<?php

    include('../pdo.php');

    $event_id = $_GET['event_id'] ?? null;

    if(!$event_id){
        echo json_encode([
            "success" => false,
            "message" => "缺少活動ID"
        ]);
        exit;
    }


    // 建立 sql
    $sql = "SELECT
                j.registration_number AS id,
                j.member_id,
                j.name,
                j.gender,
                j.phone,
                j.email,
                DATE(j.registration_date) AS apply_date
            FROM
                Joiner j
            WHERE 
                j.event_id = :event_id
            ORDER BY 
                j.registration_date ASC";

    $statement = $pdo -> prepare($sql);
    $statement -> bindParam(':event_id', $event_id);
    $statement -> execute();

    $joiners = $statement -> fetchAll(); // 報名者資料

    echo json_encode([
        "success" => true,
        "joiners" => $joiners
    ]);

























?>