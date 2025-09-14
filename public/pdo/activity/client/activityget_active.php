<?php

include('../../pdo.php');

// 1. 查詢所有「上架」活動
$sql = "SELECT * FROM `Event` WHERE is_active = 1";
$query = $pdo->prepare($sql);
$query->execute();
$activeEvents = $query->fetchAll(PDO::FETCH_ASSOC);

// 2. 英文星期 → 中文星期對照表
$weekDayMap = [ 
    "Monday"    => "一",
    "Tuesday"   => "二",
    "Wednesday" => "三",
    "Thursday"  => "四",
    "Friday"    => "五",
    "Saturday"  => "六",
    "Sunday"    => "日"
];

// 3. 處理每一筆活動資料
foreach ($activeEvents as &$event) {
    // (a) 活動日期顯示格式化（例：2025-09-20 (六) ~ 2025-09-21 (日)）
    if (!empty($event["event_start"]) && !empty($event["event_end"])) {
        $eventStart = new DateTime($event["event_start"]);
        $eventEnd   = new DateTime($event["event_end"]);

        $event["event_date_display"] =
            $eventStart->format("Y-m-d") . " (" . $weekDayMap[$eventStart->format("l")] . ") ~ " .
            $eventEnd->format("Y-m-d")   . " (" . $weekDayMap[$eventEnd->format("l")]   . ")";
    } else {
        $event["event_date_display"] = "";
    }

    // (b) 圖片欄位 JSON 解碼成陣列
    if (!empty($event["image"])) {
        $decodedImages = json_decode($event["image"], true);
        $event["image"] = is_array($decodedImages) ? $decodedImages : [];
    } else {
        $event["image"] = [];
    }
}

// 4. 回傳 JSON 結果
echo json_encode($activeEvents, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);