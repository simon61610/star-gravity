<?php

    include('../../pdo.php');

    $joinerInfo = json_decode(file_get_contents("php://input"), true);

    $event_id = $joinerInfo['event_id'];
    $member_id = $joinerInfo['member_id'];
    $name = $joinerInfo['name'];
    $gender = $joinerInfo['gender'];
    $phone = $joinerInfo['phone'];
    $email = $joinerInfo['email'];

    // 建立 SQL
    $sql = "INSERT INTO Joiner 
                    (event_id, member_id, name, gender, phone, email, registration_date)
                VALUES
                    (:event_id, :member_id, :name, :gender, :phone, :email, NOW())";

    $statement = $pdo->prepare($sql);

    $statement->bindParam(":event_id", $event_id);
    $statement->bindParam(":member_id", $member_id);
    $statement->bindParam(":name", $name);
    $statement->bindParam(":gender", $gender);
    $statement->bindParam(":phone", $phone);
    $statement->bindParam(":email", $email);

    try{
        $statement->execute();
        
        echo json_encode([
            "success" => true,
            "message" => "報名成功"
        ]);
    } catch (Exception $e) {
        echo json_encode([
            "success" => false,
            "message" => "報名失敗: " . $e->getMessage()
        ]);
    }





?>