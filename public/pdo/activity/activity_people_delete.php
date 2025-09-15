<?php

    include('../pdo.php');

    $data = json_decode(file_get_contents("php://input"), true);

    $registration_number = $data['registration_number'] ?? null;
    $member_id = $data['member_id'] ?? null;

    if(!isset($registration_number) || !isset($member_id)){
        echo json_encode([
            "success" => false,
            "message" => "缺少會員ID或報名編號"
        ]);
        exit;
    }

    // 建立 sql
    $sql = "DELETE FROM Joiner 
                WHERE registration_number = :registration_number AND member_id = :member_id";
    
    $statement = $pdo -> prepare($sql);
    $statement -> bindParam(':registration_number', $registration_number);
    $statement -> bindParam(':member_id', $member_id);

    $success = $statement -> execute(); // 筆數

    echo json_encode([
        "success" => $success,
        "message" => $success ? "刪除成功" : "刪除失敗"
    ]);
    

















?>