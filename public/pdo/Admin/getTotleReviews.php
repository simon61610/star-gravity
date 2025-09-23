<?php
include("../pdo.php");

$sql = " SELECT r.* , l.location_name , m.email as member_account
         from Review r
         join Location l on r.location_id = l.ID
         join Member m on r.member_id = m.ID 
         order by ID desc ";

$statement = $pdo->prepare( $sql);
$statement->execute();

$reviews = $statement->fetchAll();

echo json_encode($reviews); 

// echo "aaaa" ;








?>