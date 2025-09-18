<?php
include('../pdo.php');


//建立SQL
$sql = "SELECT * from Location" ;

$statement = $pdo->prepare( $sql);
$statement->execute();

$list = $statement->fetchAll();

echo json_encode($list); 

// echo 123456;




//將資料庫原有的分數統一算平均值並塞回資料庫
//建立SQL
/* for( $i=1 ; $i<20 ; $i++){
    $id = $i ;
    $sqlScore = " SELECT score from Review
                  where location_id = :id " ;
    $statement2 = $pdo->prepare( $sqlScore);
    $statement2 ->bindValue(":id" , $id);
    $statement2 ->execute();

    $scoreList = $statement2->fetchAll();
    $scoreSum = 0;
    for( $j = 0; $j < count($scoreList); $j++ ){
        $scoreSum += intval($scoreList[$j]['score']);
    };
    $scoreAverage =  round( $scoreSum / count($scoreList) , 1 ) ;
    echo $scoreAverage;

    //把平均值塞回去該地點的資料庫
    $sqlSc = " UPDATE Location SET score = :scoreAverage
            WHERE ID = :id " ;
    $statement3 = $pdo->prepare( $sqlSc);
    $statement3 ->bindValue(":scoreAverage" , $scoreAverage);
    $statement3 ->bindValue(":id" , $id);
    $statement3 ->execute();
}; */

?>