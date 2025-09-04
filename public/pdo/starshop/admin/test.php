<?php

include('../../pdo.php');

//建立SQL語法




$sql = "SELECT * FROM Product p 
        JOIN ProductImage pi
		on p.ID = pi.product_id;";


$statement = $pdo -> prepare($sql);
$statement->execute();
$products = $statement->fetchAll();

echo json_encode($products);



?>