<?php

include '../pdo.php';

$data = json_decode(file_get_contents("php://input"), true);

$memberId = (int)($data['memberId'] ?? 0);

if($memberId <= 0) {
    echo json_encode([], JSON_UNESCAPED_UNICODE);
    exit;
};

// 建立sql
$sql = "SELECT 
        p.ID,
        p.name, 
        p.sale_price   AS sale_price,      -- 折扣價
        p.original_price AS original_price, -- 原價
        p.stock,
        p.is_active,
        (
            SELECT pi.image
            FROM ProductImage pi
            WHERE pi.product_id = p.ID
            ORDER BY pi.ID ASC
            LIMIT 1
        ) AS photo_url
        FROM Favorite f
        JOIN Member m ON f.member_id = m.ID
        JOIN Product p ON f.product_id = p.ID
        WHERE m.ID = :memberId;";

$statement = $pdo->prepare($sql);
// $statement->bindValue(':memberId', $data["memberId"]);
$statement->bindValue(':memberId', $memberId, PDO::PARAM_INT);
$result = $statement->execute();

// echo $result;

$products = $statement->fetchAll();
// $events = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($products, JSON_UNESCAPED_UNICODE);


?>