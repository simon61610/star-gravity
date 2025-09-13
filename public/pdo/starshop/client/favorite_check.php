<?php

    include('../../pdo.php');

    $data = json_decode(file_get_contents("php://input"), true);

    $member_id = $data['member_id'];
    $product_id = $data['product_id'];


    $sql = "SELECT ID 
                FROM Favorite 
                WHERE member_id = :member_id AND product_id = :product_id";

    $statement = $pdo->prepare($sql);
    $statement -> bindParam(':member_id', $member_id);
    $statement -> bindParam(':product_id', $product_id);

    $statement -> execute();

    $favoriteProd = $statement -> fetch();

    echo json_encode([
        "success" => true,
        "isFavorite" => $favoriteProd ? true : false
    ]);



















?>