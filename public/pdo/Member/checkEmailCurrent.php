<?php
include('../pdo.php');

$data = json_decode(file_get_contents("php://input"), true) ;

$sql = ' SELECT * from Member
         WHERE email = :email
 ';


$statement = $pdo->prepare($sql);
$statement ->bindValue(':email' , $data['email']);
$statement->execute();
$rows = $statement->fetchAll();
$count = count($rows);

if( $count > 0 ){
    echo json_encode([
        'exist' => 'true',
        'message' => '驗證碼已寄出(此為展示訊息)'], 
        JSON_UNESCAPED_UNICODE
    );
}else{
    echo json_encode([
        'exist' => 'false',
        'message' => '該會員信箱不存在'], 
        JSON_UNESCAPED_UNICODE);
};



?>