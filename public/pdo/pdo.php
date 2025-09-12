<?php

include 'cors.php';

/* header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *"); */

// 請把這串複製一份放到阿帕契的我們專案的路徑內~ 開發的每個php檔案需要跟資料庫串聯都用incude這個檔案的方式
// incude到各自的php檔後,就可以直接用 $pdo 了,  只是$sql的語句要自己寫, 後面的資料庫執行也要自己寫

// 開發階段在本機端用這串
$URL = "mysql:host=localhost:3306;dbname=star";
$USERNAME = "root";
$PASSWORD = "password";
$pdo = new PDO($URL, $USERNAME, $PASSWORD);

// 部屬上緯育前要改用這串
//  $db_host = "127.0.0.1";
//  $db_user = "tibamefe_since2021";
//  $db_pass = "vwRBSb.j&K#E";
//  $db_select = "tibamefe_tjd102g1";
//  $dsn = "mysql:host=".$db_host.";dbname=".$db_select.";charset=utf8";
//  $pdo = new PDO($dsn, $db_user, $db_pass);





// 在Vue專案中向php發出請求的路徑差異，以 fetch 為例：
// 1. 開發時請寫網址　↓這邊是網址, 就是你用阿帕契打開php檔案後在瀏覽器上的網址
// fetch('http://localhost/star/map.php')
//     .then( resp => resp.json() )
//     .then( (members)=>{
//         要怎麼處理資料、資料該塞在哪個欄位的程式寫在這邊
//     })

// 2. 這是部屬時改寫成資料夾路徑, 但前提是要將阿帕契資料夾的php檔複製到public資料夾
//         ↓　Vue專案內的路徑 不用寫public!! 這個範例就是向public資料夾內的pdo資料夾內的test.php發出請求
// fetch('pdo/test.php')
//     .then( resp => resp.json() )
//     .then( (members)=>{
//         要如何使用資料的程式寫在這邊~
//     })

