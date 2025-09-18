<?php

// header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Origin: https://tibamef2e.com/");
// header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, X-Requested-With, Authorization");
header("Access-Control-Allow-Credentials: true");

header('Content-Type: application/json; charset=utf-8');

// 若有預檢請求（OPTIONS），可直接結束避免卡住
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}


?>