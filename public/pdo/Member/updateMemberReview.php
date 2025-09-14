<?php
include('../pdo.php');

$reviewId = $_GET['reviewId'];

$sql = ' UPDATE Review set review_status = "隱藏中"
         where ID = :reviewId
';

$statement = $pdo->prepare( $sql);
$statement->bindValue( ":reviewId" , $reviewId);
$result = $statement->execute();



// echo json_encode($reviews); 
// echo $result ;
// echo count($reviews);



if( $result ){
    echo json_encode([
       "message" => "刪除成功"
    ], JSON_UNESCAPED_UNICODE); 
}else{
    echo json_encode([
       "message" => "刪除失敗"
    ], JSON_UNESCAPED_UNICODE); 
};


?>