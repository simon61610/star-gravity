<?php
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
include('../pdo.php');
// include('cors.php');
// include('db.php');

//建立SQL語法

$sql = "select * from   `Event`" ;


//執行並查詢，會回傳查詢結果的物件
$statement = $pdo->prepare($sql);
$statement -> execute();

//處理回傳的結果
$rows = $statement->fetchAll(PDO::FETCH_ASSOC);
$weekMap = [ 
    "Monday"    => "一",
    "Tuesday"   => "二",
    "Wednesday" => "三",
    "Thursday"  => "四",
    "Friday"    => "五",
    "Saturday"  => "六",
    "Sunday"    => "日"
];

foreach ($rows as &$row) { 

   if (!empty($row["event_date"]) && strpos($row["event_date"], '~') !== false) {
        list($start, $end) = explode('~', $row["event_date"]);
        $startTs = strtotime(trim($start));
        $endTs   = strtotime(trim($end));
        $row["event_date_display"] = date("Y-m-d", $startTs) . " (" . $weekMap[date("l", $startTs)] . ") ~ " .
                                     date("Y-m-d", $endTs)   . " (" . $weekMap[date("l", $endTs)]   . ")";
    } else {
        $row["event_date_display"] = $row["event_date"];
    }


    $row["is_active_display"] = $row["is_active"] == 1 ? "上架" : "下架"; 
    $row["homepage_highlight_display"] = $row["homepage_highlight"] == 1 ? "首先推薦" : "非推薦"; 
}   


echo json_encode($rows,JSON_UNESCAPED_UNICODE); 



?>