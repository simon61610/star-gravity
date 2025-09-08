<?php


include('../pdo.php');
// include('cors.php');
// include('db.php');

$data = json_decode(file_get_contents("php://input"), true);


$tags = $data['tag_name'] ?? [];
$article_id = $data['article_id'] ?? null;


    //刪掉tag本身與文章之間得關聯 
    $sql = "DELETE FROM ArticleTag WHERE article_id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$article_id]);


    error_log("刪除 article_id=$article_id, 影響筆數=".$stmt->rowCount());
    $responseTags = [];



foreach ($tags as $tag) {
    // 1. 檢查標籤是否存在
    $sql = "SELECT id FROM Tag WHERE tag_name = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$tag]);
    $tagRow = $stmt->fetch();

    if ($tagRow) {
            $tagId = $tagRow['id']; // 標籤已存在 → 用舊的
        } else {
            // 標籤不存在 → 新增
            $sql = "INSERT INTO Tag (tag_name) VALUES (?)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$tag]);
            $tagId = $pdo->lastInsertId();
        }
     // 2. 綁定到文章
    $sql = "INSERT IGNORE INTO ArticleTag (article_id, tag_id) VALUES (?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$article_id, $tagId]);

}

$responseTags = [
    'tag_id'=> $tagId,
    'tag_name' => $tag,
    
];

$respbody = [
    "success" => true,
    "message" => '新增標籤成功',
    "article_id"=>$article_id,
    "tag"=>$responseTags];


//處理回傳的結果
echo json_encode($respbody,JSON_UNESCAPED_UNICODE); 



?>