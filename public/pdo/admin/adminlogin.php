    <?php
        header("Content-Type: application/json; charset=UTF-8");
        include('../pdo.php');
        // include('cors.php');
        // include('db.php');
        session_start();
        $data=json_decode(file_get_contents("php://input"), true);

        $username = $data["username"] ?? '';
        $password = $data["password"] ?? '';

        //建立SQL語法

        $sql = " select * from  Manager where username=? " ;


        //執行並查詢，會回傳查詢結果的物件
        $statement = $pdo->prepare($sql);
        $statement -> bindValue(1,$username);
        $statement -> execute();

        //處理回傳的結果
        $data = $statement->fetch();

        //password_verify ( 使用者輸入的密碼 , 資料庫hash的那個欄位 )
        if($data && password_verify($password,$data['password'])){
            $_SESSION["username"]= $username;
            echo json_encode(["success" => true, "message" => "登入成功"]);

        }else{
            echo json_encode(["success" => false, "message" => "登入失敗,帳號或密碼輸入錯誤"],JSON_UNESCAPED_UNICODE);
        }

    ?>