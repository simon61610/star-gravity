<?php

    include('../../pdo.php');

    /* echo json_encode([
        "ok" => true,
        "msg" => "CORS headers 正常送出"
    ]); */

    $data = json_decode(file_get_contents("php://input"), true);

    $member_id = $data['member_id'];
    $product_id = $data['product_id'];


    // ==========================================
    if(!$member_id){
        echo json_encode([
                "success" => false,
                "message" => '缺少會員ID'
            ]);
        exit;
    }


    if(!$product_id){
        echo json_encode([
                "success" => false,
                "message" => '缺少商品ID'
            ]);
        exit;
    }

    // ==========================================
    // 建立SQL
    $check_sql = "SELECT
                        ID
                    FROM Favorite
                    WHERE member_id = :member_id AND product_id = :product_id";
    
    $statement_check = $pdo -> prepare($check_sql);
    $statement_check -> bindParam(':member_id', $member_id);
    $statement_check -> bindParam(':product_id', $product_id);

    $statement_check -> execute();

    $check = $statement_check -> fetch();

    // echo json_encode($check);

    // ==========================================

    if($check){ // 若有，就取消收藏
        $ID = $check['ID'];

        $delete_sql = "DELETE FROM 
                            Favorite 
                        WHERE ID = :ID";

        $statement_delete = $pdo -> prepare($delete_sql);
        $statement_delete -> bindParam(':ID', $ID);
        $statement_delete -> execute();

        echo json_encode([
            "success" => true,
            "action" => "removed"
        ]);
    }else{ // 若沒有，就新增收藏
        $insert_sql = "INSERT INTO Favorite 
                            (member_id, product_id, created_at) 
                        VALUES 
                            (:member_id, :product_id, NOW())";
        $statement_insert = $pdo -> prepare($insert_sql);
        $statement_insert -> bindParam(':member_id', $member_id);
        $statement_insert -> bindParam(':product_id', $product_id);
        $statement_insert -> execute();

        
        echo json_encode([
            "success" => true,
            "action" => "added"
        ]);
    }

    

    














?>