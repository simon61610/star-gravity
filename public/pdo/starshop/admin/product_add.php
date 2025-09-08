<?php

    header("Access-Control-Allow-Origin: *");

    //建立PDO物件，並放入指定的相關資料
    include('../../pdo.php');

    /* 
    $product = json_decode(file_get_contents("php://input"), true);

    $name = $product['name'];
    $category_name = $product['category_name'];
    $original_price = $product['original_price'];
    $discount = $product['discount'];
    $sale_price = $product['sale_price'];
    $promotion = $product['promotion'];
    $description = $product['description'];
    $introduction = $product['introduction'];
    $stock = $product['stock'];
    $is_active = $product['is_active'];

    // 圖檔
    $images = $product['images'] 
    */
    
    // 用 $_POST 存取 FromData
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
    $images = $_FILES['images']; // 陣列資訊


    //==============================================================================

    //建立SQL
    $sql = "INSERT INTO Product
            (name, category_name, original_price, discount, sale_price, promotion, description, introduction, stock, is_active)
            VALUES
            (:name, :category_name,:original_price, :discount, :sale_price, :promotion, :description, :introduction, :stock, :is_active);";

    $statement = $pdo -> prepare($sql);
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

    //執行新增商品
    $statement -> execute();

    //==============================================================================
    // 取得新增商品的 ID
    $product_id = $pdo -> lastInsertId();

    if(isset($images)){
        foreach($images['name'] as $key => $fileName){
            //取得上傳的檔案資訊=======================================
            // $fileName 檔案名稱
            $filePath_Temp = $images["tmp_name"][$key];   //Server上的暫存檔路徑含檔名        
            $fileType = $images["type"][$key];    //檔案種類        
            $fileSize = $images["size"][$key];    //檔案尺寸
            $fileError = $images["error"][$key];

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
            $sqlImg = "INSERT INTO ProductImage (image, product_id)
                        VALUES (:image, :product_id)";

            $statementImg = $pdo -> prepare($sqlImg);
            $statementImg -> bindParam(":image", $imagePath);
            $statementImg -> bindParam(":product_id", $product_id);

            // 執行新增圖片
            $statementImg -> execute();
        }
    }

    echo json_encode([
        "success" => true,
        "message" => "商品與圖片新增成功"
    ]);

?>