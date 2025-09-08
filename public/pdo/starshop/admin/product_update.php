<?php

    // header("Access-Control-Allow-Origin: *");

    //建立PDO物件，並放入指定的相關資料
    include('../../pdo.php');

    // 用 $_POST 存取 FromData
    $ID = $_POST['ID'];
    $name = $_POST['name'];
    $category_name = $_POST['category_name'];
    $original_price = $_POST['original_price'];
    $discount = $_POST['discount'];
    $sale_price = $_POST['sale_price'];
    $promotion = $_POST['promotion'];
    $description = $_POST['description'];
    $introduction = $_POST['introduction'];
    $stock = $_POST['stock'];
    $is_active = $_POST['is_active'];
    $imageId = isset($_POST['image_ids']) ? $_POST['image_ids'] : [];
    $images = isset($_FILES['images']) ? $_FILES['images'] : null;

    //建立SQL

    //建立SQL
    $sql = "UPDATE Product
            SET
                name = :name,
                category_name = :category_name,
                original_price = :original_price,
                discount = :discount,
                sale_price = :sale_price,
                promotion = :promotion,
                description = :description,
                introduction = :introduction,
                stock = :stock,
                is_active = :is_active
            WHERE
                ID = :ID";

    $statement = $pdo -> prepare($sql);
    $statement -> bindParam(":ID", $ID);
    $statement -> bindParam(":name", $name);
    $statement -> bindParam(":category_name", $category_name);
    $statement -> bindParam(":original_price", $original_price);
    $statement -> bindParam(":discount", $discount);
    $statement -> bindParam(":sale_price", $sale_price);
    $statement -> bindParam(":promotion", $promotion);
    $statement -> bindParam(":description", $description);
    $statement -> bindParam(":introduction", $introduction);
    $statement -> bindParam(":stock", $stock);
    $statement -> bindParam(":is_active", $is_active);

    //執行更改商品文字資訊
    $statement -> execute();



    //==============================================================================
    if(!empty($images) && isset($_POST['image_ids'])){
        foreach($images['name'] as $key => $fileName){
            //取得上傳的檔案資訊=======================================
            // $fileName 檔案名稱
            $filePath_Temp = $images["tmp_name"][$key];   //Server上的暫存檔路徑含檔名        
            $fileType = $images["type"][$key];    //檔案種類        
            $fileSize = $images["size"][$key];    //檔案尺寸
            $fileError = $images["error"][$key];
            $currentImageId = $imageId[$key]; // 對應的 image_id

            // 如果傳進來是 null，要跳過這次
            if($fileName === "" || $fileError !== 0){
                continue;
            }

            //Web根目錄真實路徑
            $ServerRoot = $_SERVER["DOCUMENT_ROOT"];

            //檔案最終存放位置
            $filePath = dirname(__DIR__) . "/images/" . $fileName;
            // $filePath = $ServerRoot . "/pdo/starshop/images/" . $fileName;
            // $filePath = $ServerRoot . "/tjd102/g1/pdo/starshop/images/" . $fileName; //部屬前待修改路徑

            //將暫存檔搬移到正確位置
            move_uploaded_file($filePath_Temp, $filePath);

            // 建立要存到資料庫的圖檔路徑字串
            $imagePath = "/starshop/images/" . $fileName;

            //建立SQL
            $sqlImg = "UPDATE ProductImage
                            SET image = :image
                            WHERE ID = :ID;";

            $statementImg = $pdo -> prepare($sqlImg);
            $statementImg -> bindParam(":image", $imagePath);
            $statementImg -> bindParam(":ID", $currentImageId);

            // 執行新增圖片
            $statementImg -> execute();
        }
    }

    echo json_encode([
        "success" => true,
        "message" => "商品編輯成功"
    ]);
?>
