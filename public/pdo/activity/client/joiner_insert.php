<?php

    include('../../pdo.php');

    $joinerInfo = json_decode(file_get_contents("php://input"), true);

    $event_id = $joinerInfo['event_id'];
    $member_id = $joinerInfo['member_id'];
    $name = $joinerInfo['name'];
    $gender = $joinerInfo['gender'];
    $phone = $joinerInfo['phone'];
    $email = $joinerInfo['email'];

    // ========== 檢查是否已報名過 ==========
    $check_sql = "SELECT COUNT(*) 
                    FROM Joiner 
                        WHERE event_id = :event_id AND member_id = :member_id";

    $check_statement = $pdo->prepare($check_sql);

    $check_statement->bindParam(":event_id", $event_id);
    $check_statement->bindParam(":member_id", $member_id);
    $check_statement->execute();

    $alreadyJoined = $check_statement->fetchColumn(); // 有報名就是 1， 沒有就是 false

    if($alreadyJoined > 0){
        echo json_encode([
            "success" => false,
            "message" => "您已報名過此活動，不可重複報名"
        ]);
        exit;
    }


    // ========== 產生報名編號 ==========
    function createRegistrationNum($event_id){
        // 目標: EV + 活動ID - 隨機三碼英文+年月日+毫秒
        // 1. 隨機三碼英文
        $letters = '';

        for($i = 0; $i < 2; $i++){
            $chr = chr(random_int(65, 90)); // 隨機英文大寫
            $letters .= $chr;
        }
        
        // 2. 年月日 & 毫秒
        $now = new DateTime();

        $date = $now -> format('Ymd'); // 將日期轉成如 20250914 的字串
        $millis = $now -> format('v'); // 毫秒

        return "EV" . $event_id . "-" . $letters . $date . $millis;
    }

    $registration_number = createRegistrationNum($event_id);


    // 建立 SQL
    $sql = "INSERT INTO Joiner 
                    (event_id, member_id, registration_number, name, gender, phone, email, registration_date)
                VALUES
                    (:event_id, :member_id, :registration_number, :name, :gender, :phone, :email, NOW())";

    $statement = $pdo->prepare($sql);

    $statement->bindParam(":event_id", $event_id);
    $statement->bindParam(":member_id", $member_id);
    $statement->bindParam(":registration_number", $registration_number);
    $statement->bindParam(":name", $name);
    $statement->bindParam(":gender", $gender);
    $statement->bindParam(":phone", $phone);
    $statement->bindParam(":email", $email);

    try{
        $statement->execute();
        
        echo json_encode([
            "success" => true,
            "message" => "報名成功",
            "registration_number" => $registration_number
        ]);
    } catch (Exception $e) {
        echo json_encode([
            "success" => false,
            "message" => "報名失敗，請洽客服人員",
            "error" => "報名失敗: " . $e->getMessage()
        ]);
    }





?>