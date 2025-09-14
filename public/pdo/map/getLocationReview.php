<?php
include('../pdo.php');
$data = json_decode(file_get_contents("php://input"), true) ;

//建立SQL
// $sql = "SELECT * from Location" ;
$sql = " SELECT r.* , m.name 
         from Review r
         join Member m 
         on r.member_id = m.id
         where location_id = :locationIndex
         and review_status = '顯示中'
         order by created_at desc
" ;

$statement = $pdo->prepare( $sql);
$statement->bindValue( ":locationIndex" , $data["locationIndex"]);
$statement->execute();

$reviews = $statement->fetchAll();

echo json_encode($reviews); 

?>