<?php

    include('../../pdo.php');

    $data = json_decode(file_get_contents("php://input"), true);

    $order_id = $data['order_id'];
    $member_id = $data['member_id'];


    // ====================== 取得 Order ========================
    // 建立SQL
    $order_sql = "SELECT
                        ID,
                        order_number,
                        order_date, 
                        payment_status, 
                        payment_method, 
                        order_status, 
                        recipient_name, 
                        recipient_phone, 
                        city, 
                        area, 
                        recipient_address, 
                        shipping_method, 
                        notes, 
                        total_price, 
                        shipping_fee
                    FROM
                        `Order`
                    WHERE ID = :order_id";

    $statement_order = $pdo -> prepare($order_sql);
    $statement_order -> bindParam(':order_id', $order_id);

    // 執行
    $statement_order -> execute();
    $order = $statement_order -> fetch(); // Order

    // ====================== 取得OrderDetail ========================
    // 建立SQL
    $orderDetail_sql = "SELECT
                            ID,
                            name,
                            original_price,
                            unit_price,
                            quantity,
                            subtotal,
                            product_image,
                            product_id  
                        FROM
                            OrderDetail
                        WHERE
                            order_id = :order_id";

    $statement_orderDetail = $pdo -> prepare($orderDetail_sql);
    $statement_orderDetail -> bindParam(':order_id', $order_id);

    // 執行
    $statement_orderDetail -> execute();
    $orderDetail = $statement_orderDetail -> fetchAll(); // orderDetail

    
    // 送回前端
    echo json_encode([
        "order" => $order,
        "orderDetail" => $orderDetail
    ]);










?>