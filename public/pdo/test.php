<?php
header('Content-Type: application/json; charset=UTF-8');

//與資料庫串聯  這包團專要拉出來
// $URL = "mysql:host=localhost:3306;dbname=star";
// $USERNAME = "root";
// $PASSWORD = "password";
// $pdo = new PDO($URL, $USERNAME, $PASSWORD);

    $db_host = "127.0.0.1";
    $db_user = "tibamefe_since2021";
    $db_pass = "vwRBSb.j&K#E";
    $db_select = "tibamefe_tjd102g1";
    //建立資料庫連線物件
    $dsn = "mysql:host=".$db_host.";dbname=".$db_select.";charset=utf8";

    //建立PDO物件，並放入指定的相關資料
    $pdo = new PDO($dsn, $db_user, $db_pass);


    //建立SQL語法
    $sql = " SELECT * FROM Menber";

    //請資料庫執行
    $pstmt = $pdo->prepare($sql);
    $pstmt->execute();
    $members = $pstmt->fetchAll();


    echo json_encode( $members) ;

?>