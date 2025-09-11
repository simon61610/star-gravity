<?php

header("Content-Type: application/json; charset=UTF-8");
include('../pdo.php');



// 檢查是否有圖檔案
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



//正是儲存部屬路徑
// $savepath = $_SERVER['DOCUMENT_ROOT'] . "/tjd102/g1/pdo/activity/acimg/"; 

//測試儲存使用路徑
$savepath = __DIR__ . "/acimg/"; 

// ------------------ 前端要存的 URL ------------------
//$_SERVER['HTTPS'] 用來判斷網站是否加密的一個方法 , Apache 沒加密會是空值 有加密會給值 on
$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? "https://" : "http://"; //判斷網址是否是加密或者非加密

$host  = $_SERVER['HTTP_HOST']; //抓目前請求的主機名稱（網址裡的 domain + port）。

// 判斷是否為本地環境 strpos () php的方法 可以用來尋找檢查是否有某個值
if (strpos($host, 'localhost') !== false) {    //檢查$host這個網址是否有localhost (是否本機)
    // 本地：多一層 /public
    $baseUrl = $protocol . $host . "/star-gravity/public/pdo/activity/acimg/";
} else {
    // 正式機：不用 /public
    $baseUrl = $protocol . $host . "/tjd102/g1/pdo/activity/acimg/";
}

// 最終要回傳給前端的網址
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

