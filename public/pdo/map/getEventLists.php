<?php
include('../pdo.php');

$sql = " SELECT * from Event
         where homepage_highlight = '1'
         order by event_start asc ";

$statement = $pdo->prepare($sql);
$statement->execute();

$events = $statement->fetchAll();

// echo $result ;
// echo 123 ;

echo json_encode($events);




?>