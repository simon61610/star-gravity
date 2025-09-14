<?php

header("Content-Type: application/json; charset=UTF-8");
// header("Access-Control-Allow-Credentials: true");  // 一定要加
// header("Access-Control-Allow-Origin: http://localhost:5173"); // 或指定你的前端網址
// header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
// header("Access-Control-Allow-Headers: Content-Type, Authorization");

// // 如果是 OPTIONS 預檢請求，直接回應 200
// if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
//     http_response_code(200);
//     exit;
// }
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