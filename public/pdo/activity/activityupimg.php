<?php

header("Content-Type: application/json; charset=UTF-8");
include('../pdo.php');



// 檢查是否有檔案
if (!isset($_FILES['file'])) {
    echo json_encode(["success" => false, "message" => "沒有收到圖片"]);
    exit;
}



$fileTmp  = $_FILES["file"]["tmp_name"]; 
$fileName = $_FILES["file"]["name"];     
$fileErr  = $_FILES["file"]["error"];

if ($fileErr !== UPLOAD_ERR_OK) {
    echo json_encode(["success" => false, "message" => "上傳失敗"]);
    exit;
}

// header("Access-Control-Allow-Origin: *"); 
// header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
// header("Access-Control-Allow-Headers: Content-Type");
//  if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
//      http_response_code(200);
//      exit;
//  }

// include('db.php');


$savepath = $_SERVER['DOCUMENT_ROOT'] . "/tjd102/g1/pdo/activity/acimg/"; 

$ajaxBase = getenv('VITE_AJAX_URL') ?: '/tjd102/g1/pdo/';
$baseUrl  = rtrim($ajaxBase, '/') . "/activity/acimg/";  //刪除多於斜線 rtrim($ajaxBase, '/')
// $baseUrl = "/tjd102/g1/pdo/activity/acimg/";
$webUrl = $baseUrl . basename($fileName);
$move_uploaded = $savepath . basename($fileName); //定義圖檔案路徑還沒有檔案

//將檔案搬到 $move_uploaded 上面設置的路徑
if (move_uploaded_file($fileTmp, $move_uploaded)) {
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

