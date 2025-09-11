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
]; //用來英文轉中文的陣列對照表

foreach ($rows as &$row) { 
        if (!empty($row["event_start"]) && !empty($row["event_end"])) {
        // 因為要用 format是DateTime的一個方法用他處理顯示格式  所以先把資料轉成DateTime
        $startDate = new DateTime($row["event_start"]);  
        $endDate   = new DateTime($row["event_end"]);

        // 利用 format("l") 取英文星期，再用 $weekMap 換成中文
        $row["event_date_display"] =
            $startDate->format("Y-m-d") . " (" . $weekMap[$startDate->format("l")] . ") ~ " .
            $endDate->format("Y-m-d")   . " (" . $weekMap[$endDate->format("l")]   . ")";
    } else {
        // event_date_display 最後會輸出「日期 (中文星期)」的格式。沒資料就給空
        $row["event_date_display"] = "";
    }



//時間戳記方法
//    if (!empty($row["event_start"]) && !empty($row["event_end"])) {
//         $startTs = strtotime($row["event_start"]); //利用strtotime() 把時間轉乘時間戳記(秒數)
//         $endTs   = strtotime($row["event_end"]);

//         //利用php date的參數l(小寫l)取出星期幾(英文) 再用上面設定的中文對照英文做轉換
//         $row["event_date_display"] = date("Y-m-d", $startTs) . " (" . $weekMap[date("l", $startTs)] . ") ~ " .
//                                     date("Y-m-d", $endTs)   . " (" . $weekMap[date("l", $endTs)]   . ")";
//     } else {
//         $row["event_date_display"] = ""; //event_date_display 最後會輸出「日期 (中文星期)」的格式。 沒資料就給空 
//         }


    $row["is_active_display"] = $row["is_active"] == 1 ? "上架" : "下架";  //欄位 is_active = 1 or 0 如果是true  欄位 is_active_display顯示上架
    $row["homepage_highlight_display"] = $row["homepage_highlight"] == 1 ? "首先推薦" : "非推薦"; 
}   


echo json_encode($rows,JSON_UNESCAPED_UNICODE); 



?>