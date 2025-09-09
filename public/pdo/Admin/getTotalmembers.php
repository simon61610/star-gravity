<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Requested-With, Authorization');

include("../pdo.php");

$sql = ' SELECT * from Member ' ;

$statement = $pdo->prepare( $sql);
$statement->execute();

$reviews = $statement->fetchAll();

// echo "aaaaa" ;

echo json_encode($reviews); 



?>