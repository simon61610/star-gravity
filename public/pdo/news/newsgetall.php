<?php

include('../../pdo.php');
// include('cors.php');
// include('db.php');


$ID = $_GET['id'] ?? null ;
//建立SQL語法


if($ID){
        $sql = "select * from  article where ID = ?" ;

        //執行並查詢，會回傳查詢結果的物件
        $statement = $pdo->prepare($sql);
        $statement -> bindValue(1,"$ID");
        $statement -> execute();

        //處理回傳的結果
        $article = $statement->fetch(PDO::FETCH_ASSOC);

        echo json_encode([
            "success"=>'成功',
            "article"=> $article
        ]); 
}else{
        echo json_encode([
            "message"=>'失敗']); 
}




?>