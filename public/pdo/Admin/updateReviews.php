    <?php
    //前端用POST 要處理cors
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
    header("Access-Control-Allow-Credentials: true");
    header('Content-Type: application/json; charset=utf-8');

    include('../pdo.php');

    $data = json_decode(file_get_contents("php://input"), true) ;

    //兩種sql寫法都可以
    // $sql = " UPDATE Review r
    //          JOIN Member m on  r.member_id = m.ID
    //          SET r.review_status = :review_status
    //          WHERE m.email = :email AND r.location_id = :location_id
    //          " ;
    $sql = " UPDATE Review 
            SET review_status = :review_status
            WHERE member_id = (SELECT ID FROM Member WHERE email = :email) 
            AND location_id = :location_id
           ";

    $statement = $pdo->prepare($sql);
    $statement->bindValue(':review_status', $data['review_status']);
    $statement->bindValue(':email', $data['member_email']);
    $statement->bindValue(':location_id', $data['location_id']);
    $result = $statement->execute();

    if($result){
        $selectSql = " SELECT r.* , l.location_name , m.email as member_account
                        from Review r
                        join Location l on r.location_id = l.ID
                        join Member m on r.member_id = m.ID 
                        order by created_at desc ";

        $stat = $pdo->prepare($selectSql);
        $stat->execute();
        $reviews = $stat->fetchAll();

        echo json_encode([
            'success' => true ,
            'message' => '更新成功',
            'data' => $reviews
        ]); 

    }else{
        echo json_encode([
            'success' => false,
            'message' => '更新失敗'
        ]);
    };












    ?>
