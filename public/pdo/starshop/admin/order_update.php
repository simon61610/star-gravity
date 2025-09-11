<?php

    //建立PDO物件，並放入指定的相關資料
    include('../../pdo.php');

    $orderInfo = json_decode(file_get_contents("php://input"), true);

    $ID = $orderInfo["ID"];
    $order_status = $orderInfo["order_status"];

    // echo $ID;
    // echo $order_status;


    //建立SQL
    $sql = "UPDATE `Order`
            SET
                order_status = :order_status
            WHERE
                ID = :ID";

    $statement = $pdo -> prepare($sql);
    $statement -> bindParam(":order_status", $order_status);
    $statement -> bindParam(":ID", $ID);


    //執行
    $statement -> execute();


    echo json_encode([
        "success" => true,
        "message" => "訂單狀態編輯成功"
    ]);

    



















?>