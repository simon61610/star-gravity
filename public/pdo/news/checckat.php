<?php
include('../pdo.php');

$sql = "SELECT MAX(updated_at) AS updated_at FROM Article";
$statement = $pdo->query($sql);
$row = $statement->fetch(PDO::FETCH_ASSOC);

echo json_encode($row);
?>