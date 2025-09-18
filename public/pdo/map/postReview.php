<?php
include('../pdo.php');

//前端用formData傳來, php可以用$_POST接收文字資料 $_FILES接收file資料
$score = $_POST['score'];
$content = $_POST['content'];
$created_ms = $_POST['created_ms'];
$location_id = $_POST['location_id'];
$member_id = $_POST['member_id'];
$image = isset($_FILES['image'])? $_FILES['image'] : null;

//將前端變數轉換成資料庫所需的created_at (資料型態是Date) php轉換時間是用秒
$sec = intval($created_ms)/1000 ;
$created_at = date("Y-m-d h-m-s", $sec );

//預設圖片資訊
$fileName = '';
$uploadFileDir = null ;
$dest_path = null ;
$imagePath = null;

if (isset($image)) {
    // 取得原始檔案的副檔名
    $fileExtension = pathinfo($image['name'], PATHINFO_EXTENSION);
    $fileName = $location_id . '_' . $created_ms . '.' . $fileExtension; // 加上副檔名
    $uploadFileDir = __DIR__ . '/uploadImages/';
    $dest_path = $uploadFileDir . $fileName;
    $imagePath = "/map/uploadImages/" . $fileName; 
};

// echo $fileName;
// echo "<br>";
// echo $uploadFileDir;
// echo "<br>";
// echo $dest_path;
// echo "aaaaa";
// echo $imagePath;


if( isset($image) ){
    $fileTmpPath = $_FILES['image']['tmp_name'];
    move_uploaded_file($fileTmpPath, $dest_path);
    // echo json_encode(["status"=>"success", "message"=>"檔案上傳成功", "path"=>$dest_path]);
}



//建立SQL
$sql = " INSERT into Review(created_at, content, image, review_status, score, member_id, location_id)
         values(:created_at, :content, :imagePath , '顯示中', :score, :member_id, :location_id)
" ;

$statement = $pdo->prepare( $sql);
$statement->bindValue(":content" , $content);
$statement->bindValue(":created_at" , $created_at);
$statement->bindValue(":imagePath" , $imagePath);
$statement->bindValue(":score" , $score);
$statement->bindValue(":location_id" , $location_id);
$statement->bindValue(":member_id" , $member_id);

//$statement->execute()會回傳布林值 可以用變數接收
$result = $statement->execute();
// echo $result;
if ($result) {
    // echo '成功';
    echo json_encode([
        "status"=>"success", 
        "message"=>"評論新增成功"],
        JSON_UNESCAPED_UNICODE
    );
} else {
    echo json_encode([
        "status"=>"error", 
        "message"=>"資料庫錯誤"],
        JSON_UNESCAPED_UNICODE
    );
};



//計算地點的平均分數
//建立SQL
$sqlScore = " SELECT score from Review
              where location_id = :location_id " ;
$statement2 = $pdo->prepare( $sqlScore);
$statement2 ->bindValue(":location_id" , $location_id);
$statement2 ->execute();

$scoreList = $statement2->fetchAll();
$scoreSum = 0;
for( $i = 0; $i < count($scoreList); $i++ ){
    $scoreSum += intval($scoreList[$i]['score']);
};
$scoreAverage =  round( $scoreSum / count($scoreList) , 1 ) ;

//把平均值塞回去該地點的資料庫
$sqlSc = " UPDATE Location SET score = :scoreAverage
           WHERE ID = :location_id " ;
$statement3 = $pdo->prepare( $sqlSc);
$statement3 ->bindValue(":scoreAverage" , $scoreAverage);
$statement3 ->bindValue(":location_id" , $location_id);
$statement3 ->execute();

