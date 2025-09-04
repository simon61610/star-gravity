<?php

include('../pdo.php');
// include('cors.php');
// include('db.php');


$data = json_decode(file_get_contents("php://input"), true);

error_log("收到的資料: " . json_encode($data));
$token = $data['token'] ?? '';
$article_id = $data['article_id'] ?? null;
$action = $data['action'] ?? 'like'; //預設是點讚行為

//查詢總讚數的funtion
function getlikeCount($pdo, $article_id, $token){
    $sql = "SELECT COUNT(*) as likeCount FROM Likes WHERE article_id = ?";
    $statement = $pdo->prepare($sql);
    $statement->bindValue(1,$article_id);
    $statement->execute();
    $result = $statement->fetch(PDO::FETCH_ASSOC);
    $likeCount = $result['likeCount'] ?? 0;

    //2.再從like表查token有沒有重複
    $sql = "SELECT * FROM Likes WHERE article_id = ? AND token = ? LIMIT 1";
    $statement = $pdo->prepare($sql);
    $statement->bindValue(1,$article_id);
    $statement->bindValue(2,$token);
    $statement->execute();
    $liked = $statement->fetch() ? true : false;

    return [$likeCount, $liked];  // 回傳陣列
};
//建立SQL語法

if($action === 'like'){

    $sql = "INSERT IGNORE INTO Likes( token , article_id) VALUES (?,?)  ";
    $statement = $pdo->prepare($sql);
    $statement -> bindValue(1,$token);
    $statement -> bindValue(2,$article_id);
    $statement -> execute();
    $message = "按贊成功";
    $rows = $statement->rowCount(); // 取得受影響的筆數（成功新增應該是 1）

    $result = getLikeCount($pdo, $article_id, $token);
    $likeCount = $result[0];
    $liked = $result[1];


    $respbody =  [
    "article_id" => $article_id,
    "token" => $token,  
    "success" => true,
    "message" => $rows > 0 ? $message : "失敗，可能已經點過讚或沒有可以取消的讚",
    "likeCount" => $likeCount, 
    "liked" => $liked   
];

}else if ($action === 'unlike'){
    $sql = "DELETE FROM Likes WHERE token = ? AND article_id = ? ";
    $statement = $pdo->prepare($sql);
    $statement -> bindValue(1,$token);
    $statement -> bindValue(2,$article_id);
    $statement -> execute();
    $rows = $statement->rowCount(); // 取得受影響的筆數（成功新增應該是 1）
    $message = "取消按讚";

    $sql = "SELECT COUNT(*) as likeCount FROM Likes WHERE article_id = ?";
    $statement = $pdo->prepare($sql);
    $statement->bindValue(1,$article_id);
    $statement->execute();
    $result = $statement->fetch(PDO::FETCH_ASSOC);
    $likeCount = $result['likeCount'] ?? 0;

    $respbody =  [
    "article_id" => $article_id,
    "token" => $token,
    "success" => $rows> 0,   // 只要有影響筆數，就代表成功
    "message" => $rows > 0 ? $message : "失敗，可能已經點過讚或沒有可以取消的讚",
    "likeCount" => $likeCount,
    "liked" => false
];

}else if ($action === 'get'){

    $result = getLikeCount($pdo, $article_id, $token);
    $likeCount = $result[0];
    $liked = $result[1];

    $respbody =  [
    "article_id" => $article_id,
    "token" => $token,
    "likeCount" => $likeCount, // 文章總讚數
    "liked" => $liked,              // 使用者是否已經按過
    "success" => true
    ];
}


//處理回傳的結果
echo json_encode($respbody); 

?>