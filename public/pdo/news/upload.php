<?php


include('../pdo.php');
// header("Content-Type: application/json; charset=UTF-8");
// header("Access-Control-Allow-Origin: *"); 
// header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
// header("Access-Control-Allow-Headers: Content-Type");
//  if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
//      http_response_code(200);
//      exit;
//  }

// include('db.php');


$savepath = $_SERVER['DOCUMENT_ROOT'] . "/tjd102/g1/pdo/news/image/"; 
$baseUrl = "/tjd102/g1/pdo/news/image/";
$webUrl = $baseUrl . basename($_FILES["file"]["name"]);
$move_uploaded = $savepath . basename($_FILES["file"]["name"]); //定義圖檔案路徑還沒有檔案

//將檔案搬到 $move_uploaded 上面設置的路徑
if (move_uploaded_file($_FILES["file"]["tmp_name"], $move_uploaded)) {
    echo json_encode([
        "success" => true,
        "url" => $webUrl
    ],JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode([
        "success" => false,
        "error" => "Upload failed"
    ],JSON_UNESCAPED_UNICODE);
}











?>