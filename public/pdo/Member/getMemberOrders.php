<?php
include '../pdo.php';

$data = json_decode(file_get_contents("php://input"), true) ;

$memberId = (int)($data['memberId'] ?? 0);

if($memberId <= 0) {
    echo json_encode([], JSON_UNESCAPED_UNICODE);
    exit;
};

// 只抓你需要的四個欄位，金額用 total_price + shipping_fee 算出來
$sql = "SELECT order_number,DATE(order_date) AS order_date,
        (total_price + shipping_fee) AS dollars, order_status
        FROM `Order`
        WHERE member_id = :memberId
        ORDER BY ID DESC";
$statement = $pdo->prepare($sql);
$statement->bindValue(':memberId', $data["memberId"]);
$statement->execute();

$orders = $statement->fetchAll();

// 格式化輸出
$out = [];
foreach ($orders as $r) {
    $out[] = [
        'order_number' => $r['order_number'],
        'order_date'   => $r['order_date'],
        'dollars'      => number_format((int)$r['dollars']),  // 千分位
        'order_status' => $r['order_status']
    ];
};

echo json_encode($out, JSON_UNESCAPED_UNICODE);














?>