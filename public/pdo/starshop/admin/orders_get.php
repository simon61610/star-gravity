<?php

    include('../../pdo.php');

    // ====================== 取得所有 Order ========================
    // 建立SQL
    $orders_sql = "SELECT
                    od.ID,
                    od.order_number,
                    od.order_date,
                    DATE(od.order_date) as date,
                    TIME(od.order_date) as time,
                    od.payment_status,
                    od.payment_method,
                    od.order_status,
                    od.recipient_name,
                    od.recipient_phone,
                    od.city,
                    od.area,
                    od.recipient_address,
                    od.shipping_method,
                    od.notes,
                    od.total_price,
                    od.shipping_fee,
                    od.member_id,
                    mb.email as account
                FROM 
                    `Order` od
                LEFT JOIN Member mb
                    on od.member_id = mb.ID
                ORDER BY order_date DESC";

    $statement_orders = $pdo -> prepare($orders_sql);

    // 執行
    $statement_orders -> execute();
    $orders = $statement_orders -> fetchAll(); // Order

    // 送回前端
    echo json_encode($orders);










?>