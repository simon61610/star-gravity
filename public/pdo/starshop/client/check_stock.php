<?php

    include('../../pdo.php');

    $product_id = $_GET['product_id'] ?? null;

    if(!isset($product_id)){
        echo json_encode([
            "success" => false,
            "message" => "缺少商品ID"
        ]);
        exit;
    }

    $sql = "SELECT 
                stock,
                is_active 
            FROM Product 
            WHERE ID = :product_id";

    $statement = $pdo -> prepare($sql);
    $statement -> bindParam(":product_id", $product_id);
    $statement -> execute();

    $product_data = $statement->fetch();

    echo json_encode([
        "success" => true,
        "product_id" => $product_id,
        "stock" => $product_data['stock'],
        "is_active" => $product_data['is_active']
    ]);

    /* $stock = $statement->fetchColumn();

    echo json_encode([
        "success" => true,
        "product_id" => $product_id,
        "stock" => $stock
    ]); */







?>