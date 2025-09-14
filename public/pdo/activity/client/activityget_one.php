<?php
include('../../pdo.php');

$input = json_decode(file_get_contents("php://input"), true);

// 1. 從 URL 取得活動 ID，例如：activityget_one.php?id=5
$eventId = $_GET['id'] ?? null;

if (!$eventId) {
    echo json_encode(["error" => "缺少參數 id"], JSON_UNESCAPED_UNICODE);
    exit;
}

// 2. 查詢單筆「上架中」的活動
$sql = "SELECT * FROM `Event` WHERE ID = ? AND is_active = 1";
$query = $pdo->prepare($sql);
$query->execute([$eventId]);
$event = $query->fetch(PDO::FETCH_ASSOC);

// 3. 如果找不到資料，回傳 null
if (!$event) {
    echo json_encode(null, JSON_UNESCAPED_UNICODE);
    exit;
}

// 4. 英文星期 → 中文星期對照表
$weekDayMap = [ 
    "Monday"    => "一",
    "Tuesday"   => "二",
    "Wednesday" => "三",
    "Thursday"  => "四",
    "Friday"    => "五",
    "Saturday"  => "六",
    "Sunday"    => "日"
];

// 5. 活動日期格式化（例：2025-09-20 (六) ~ 2025-09-21 (日)）
if (!empty($event["event_start"]) && !empty($event["event_end"])) {
    $eventStart = new DateTime($event["event_start"]);
    $eventEnd   = new DateTime($event["event_end"]);

    $event["event_date_display"] =
        $eventStart->format("Y-m-d") . " (" . $weekDayMap[$eventStart->format("l")] . ") ~ " .
        $eventEnd->format("Y-m-d")   . " (" . $weekDayMap[$eventEnd->format("l")]   . ")";
} else {
    $event["event_date_display"] = "";
}

// 6. 圖片欄位 JSON 解碼
if (!empty($event["image"])) {
    $decodedImages = json_decode($event["image"], true);
    $event["image"] = is_array($decodedImages) ? $decodedImages : [];
} else {
    $event["image"] = [];
}

// 7. 回傳 JSON 結果
echo json_encode($event, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);