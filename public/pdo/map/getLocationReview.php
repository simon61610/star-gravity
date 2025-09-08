<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
//     http_response_code(200);
//     exit;
// };

$data = json_decode(file_get_contents("php://input"), true) ;
include('pdo.php');

//建立SQL
// $sql = "SELECT * from Location" ;
$sql = " SELECT r.* , m.name 
         from Review r
         join Member m 
         on r.member_id = m.id
         where location_id = :locationIndex
         and review_status = '顯示中'
         order by created_at desc
" ;

$statement = $pdo->prepare( $sql);
$statement->bindValue( ":locationIndex" , $data["locationIndex"]);
$statement->execute();

$reviews = $statement->fetchAll();

echo json_encode($reviews); 

?>