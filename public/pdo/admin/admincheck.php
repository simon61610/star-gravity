<?php
header("Content-Type: application/json; charset=UTF-8");
// include('cors.php');
session_start();

if(isset($_SESSION["username"])){
    echo json_encode([
        "login" => true, 
        "user" => $_SESSION["username"]
    ]);
}else{
    echo json_encode([
        "login" => false, 
        "message" => "登入失敗,沒有找到對應的sesstion"],JSON_UNESCAPED_UNICODE);
    };


?>