<?php
include("../pdo.php");

$sql = ' SELECT * from Member
         order by ID desc  
' ;

$statement = $pdo->prepare( $sql);
$statement->execute();

$reviews = $statement->fetchAll();

// echo "aaaaa" ;

echo json_encode($reviews); 



?>