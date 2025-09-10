<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');


// include('pdo.php');
include('../pdo.php');

//建立SQL
$sql = "SELECT * from Location" ;

$statement = $pdo->prepare( $sql);
$statement->execute();

$list = $statement->fetchAll();

echo json_encode($list); 

// echo 123456;

?>