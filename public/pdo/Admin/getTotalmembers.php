<?php
include("../pdo.php");

$sql = ' SELECT * from Member ' ;

$statement = $pdo->prepare( $sql);
$statement->execute();

$reviews = $statement->fetchAll();

// echo "aaaaa" ;

echo json_encode($reviews); 



?>