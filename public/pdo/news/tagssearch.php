<?php


include('../pdo.php');
// include('cors.php');
// include('db.php');

//建立SQL語法

$sql = "select a.ID, t.tag_name from  Article a 
left join Articletag ad on a.id =  ad.article_id
left join Tag t on t.id  = ad.tag_id" ;

//執行並查詢，會回傳查詢結果的物件
$statement = $pdo->prepare($sql);
$statement -> execute();

//處理回傳的結果
$rows = $statement->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($rows,JSON_UNESCAPED_UNICODE); 



?>