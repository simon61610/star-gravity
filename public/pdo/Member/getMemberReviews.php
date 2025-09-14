<?php
include('../pdo.php');

$data = json_decode(file_get_contents("php://input"), true) ;
$status = "顯示中";

$sql = ' SELECT r.* , l.location_name 
         from Review r
         join Location l on r.location_id = l.ID
         join Member m on r.member_id = m.ID
         WHERE r.member_id = :memberId and r.review_status = :status
         order by r.ID desc
';

$statement = $pdo->prepare( $sql);
$statement->bindValue( ":memberId" , $data["memberId"]);
$statement->bindValue( ":status" , $status);
$statement->execute();

$reviews = $statement->fetchAll();

// echo json_encode($reviews); 
// echo 1235465 ;
// echo count($reviews);



if(count($reviews) < 1){
    echo json_encode([]); 
}else{
    echo json_encode($reviews); 
};


?>