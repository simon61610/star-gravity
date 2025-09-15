<?php

    include '../pdo.php';

    // $input = json_decode(file_get_contents("php://input"), true);
    $member_id = $_GET['member_id'] ?? null;

    if(!$member_id ){
        echo json_encode([
            "success" => false,
            "message" => "缺少會員 ID"
        ]);
        exit;
    }

    $sql = "SELECT
                name,
                email,
                phone,
                city, 
                area, 
                address,
                gender
            FROM Member
                WHERE ID = :id";

    $statement = $pdo -> prepare($sql);
    $statement -> bindParam(":id", $member_id);
    $statement -> execute();

    $member = $statement -> fetch();

    if($member){
        echo json_encode([
           "success" => true,
           "memberInfo" =>  $member
        ]);
    }else{
        echo json_encode([
            "success" => false,
            "message" => "查無會員資料"
        ]);
    }


















?>