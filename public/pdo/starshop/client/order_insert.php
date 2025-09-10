<?php

include('../../pdo.php');

$orderInfo = json_decode(file_get_contents("php://input"), true);


// 存取資料
$member_id = $orderInfo['member_id'];
$shipping_method = $orderInfo['shipping_method'];
$payment_method = $orderInfo['payment_method'];
$recipient_name = $orderInfo['recipient_name'];
$recipient_phone = $orderInfo['recipient_phone'];
$city = $orderInfo['city'];
$area = $orderInfo['area'];
$recipient_address = $orderInfo['recipient_address'];
$notes = $orderInfo['notes'];
$cart = $orderInfo['cart']; // 購物車商品陣列
$total_price = $orderInfo['total_price'];
$shipping_fee = $orderInfo['shipping_fee'];

//======================================= 新增Order =======================================
// 建立SQL
$sql = "INSERT INTO `Order`
        (order_date, payment_status, payment_method, order_status, recipient_name, recipient_phone, city, area, recipient_address, shipping_method, notes, shipping_fee, total_price, member_id)
        VALUES
        (NOW(), '未付款', :payment_method, '未出貨', :recipient_name, :recipient_phone, :city, :area, :recipient_address, :shipping_method, :notes, :shipping_fee, :total_price, :member_id)";


$statement = $pdo -> prepare($sql);

$statement -> bindParam(":payment_method", $payment_method);
$statement -> bindParam(":recipient_name", $recipient_name);
$statement -> bindParam(":recipient_phone", $recipient_phone);
$statement -> bindParam(":city", $city);
$statement -> bindParam(":area", $area);
$statement -> bindParam(":recipient_address", $recipient_address);
$statement -> bindParam(":shipping_method", $shipping_method);
$statement -> bindParam(":notes", $notes);
$statement -> bindParam(":shipping_fee", $shipping_fee);
$statement -> bindParam(":total_price", $total_price);
$statement -> bindParam(":member_id", $member_id);

//執行新增訂單
$statement -> execute();

//======================================= 新增OrderDetail =======================================
// 取得新增訂單的 ID
$order_id = $pdo -> lastInsertId();

// 建立SQL
$sqlDetail = "INSERT INTO OrderDetail
            (name, original_price, unit_price, quantity, subtotal, product_image, order_id, product_id)
            VALUES
            (:name, :original_price, :unit_price, :quantity, :subtotal, :product_image, :order_id, :product_id)";

$statementDetail = $pdo -> prepare($sqlDetail);

    // print_r($cart); // 商品陣列
    /* [0] => Array ( 
            [ID] => 2 
            [name] => 輕型孩童款 50mm 輕型望遠鏡 
            [firstImage] => /pdo/starshop/images/基礎入門型2-1.png 
            [originalPrice] => 4800 
            [unitPrice] => 3840 
            [qty] => 2 
            [itemSubTotal] => 7680 ) ... 
    */

    foreach($cart as $item){

        // Table
        /* Table: OrderDetail
            Columns:
                ID int AI PK 
                name varchar(100) 
                original_price int 
                unit_price int 
                quantity int 
                subtotal int 
                product_image varchar(255) 
                order_id int 
                product_id int 
        */

        $name_d = $item['name'];
        $original_price_d = $item['originalPrice'];
        $unit_price_d = $item['unitPrice'];
        $quantity_d = $item['qty'];
        $subtotal_d = $item['itemSubTotal'];
        $product_image_d = $item['firstImage'];
        $product_id_d = $item["ID"];


        $statementDetail -> bindParam(":name", $name_d);
        $statementDetail -> bindParam(":original_price", $original_price_d);
        $statementDetail -> bindParam(":unit_price", $unit_price_d);
        $statementDetail -> bindParam(":quantity", $quantity_d);
        $statementDetail -> bindParam(":subtotal", $subtotal_d);
        $statementDetail -> bindParam(":product_image", $product_image_d);
        $statementDetail -> bindParam(":order_id", $order_id);
        $statementDetail -> bindParam(":product_id", $product_id_d);

        // 每件商品都執行一次: 新增訂單細項
        $statementDetail -> execute();
    }




echo json_encode([
    "success" => true,
    "message" => "訂單新增成功",
    "order_id" => $order_id
]);

















?>