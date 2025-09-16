<?php

include '../pdo.php';

$raw = file_get_contents('php://input');
$body = json_decode($raw, true) ?: [];
$memberId  = (int)($body['memberId']  ?? 0);
$productId = (int)($body['productId'] ?? 0);

$data = json_decode(file_get_contents("php://input"), true);

$memberId = (int)($data['memberId'] ?? 0);

if($memberId <= 0 || $productId <= 0) {
    echo json_encode(['success'=>false,'message'=>'缺少參數'], JSON_UNESCAPED_UNICODE);
    exit;
};

try {
    $st = $pdo->prepare('DELETE FROM Favorite 
                        WHERE member_id = :mid AND product_id = :pid 
                        LIMIT 1');
    $st->execute([':mid'=>$memberId, ':pid'=>$productId]);

    echo json_encode(['success'=>true, 'deleted'=>$st->rowCount()], JSON_UNESCAPED_UNICODE);
} catch (Throwable $e) {
    echo json_encode(['success'=>false, 'message'=>$e->getMessage()], JSON_UNESCAPED_UNICODE);
}















?>