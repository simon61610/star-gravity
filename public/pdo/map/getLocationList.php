<?php
include('../pdo.php');


//建立SQL
$sql = "SELECT * from Location" ;

$statement = $pdo->prepare( $sql);
$statement->execute();

$list = $statement->fetchAll();

echo json_encode($list); 

// echo 123456;

?>