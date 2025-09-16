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

    $sql = "SELECT stock 
                FROM Product 
                WHERE ID = :product_id";

    $statement = $pdo -> prepare($sql);
    $statement -> bindParam(":product_id", $product_id);
    $statement -> execute();
    $stock = $statement->fetchColumn();

    echo json_encode([
        "success" => true,
        "product_id" => $product_id,
        "stock" => $stock
    ]);







?>