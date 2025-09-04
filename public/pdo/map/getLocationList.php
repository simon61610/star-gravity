<?php
// header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

include('pdo.php');

//建立SQL
$sql = "SELECT * from Location" ;

$statement = $pdo->prepare( $sql);
$statement->execute();

$list = $statement->fetchAll();

echo json_encode($list); 

?>