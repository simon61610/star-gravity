<?php

    // header("Access-Control-Allow-Origin: *");


    //建立PDO物件，並放入指定的相關資料
    include('../../pdo.php');

    // 建立SQL
    // $sql = "SELECT * FROM Product;";
    $sql = "SELECT 
                p.ID,
                p.name,
                p.category_name,
                p.original_price,
                p.discount,
                p.sale_price,
                p.promotion,
                p.description,
                p.introduction,
                p.stock,
                p.is_active,
                GROUP_CONCAT(pi.image) AS images,
                GROUP_CONCAT(pi.ID) AS image_ids
            FROM Product p
                LEFT JOIN ProductImage pi 
                ON p.ID = pi.product_id
            GROUP BY 
                p.ID";

    //執行並查詢，會回傳查詢結果的物件，必須使用fetch、fetchAll...等方式取得資料
    $statement = $pdo -> query($sql);

    //抓出全部且依照順序封裝成一個二維陣列
    $data = $statement -> fetchAll();

    echo json_encode($data);





?>