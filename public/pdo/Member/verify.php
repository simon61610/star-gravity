<?php
    include '../pdo.php';

    ini_set('display_errors', '0');
    error_reporting(E_ALL);

    session_start();

    // 讀取前端送來的 token
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true) ?: [];
    $token = isset($data['token']) ? trim($data['token']) : '';

    // 方法1：只用 Session 驗證（如果你不想用 token）
    if ($token === '') {
        // 檢查 Session
        if (isset($_SESSION['memberID']) && !empty($_SESSION['memberID'])) {
            // 從資料庫取得會員資訊
            $sql = "SELECT * FROM Member WHERE ID = :member_id LIMIT 1";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([':member_id' => $_SESSION['memberID']]);
            $member = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($member) {
                echo json_encode([
                    'valid' => true,
                    'user' => [
                        'ID' => (int)$member['ID'],
                        'email' => $member['email'] ?? '',
                        'name' => $member['name'] ?? '',
                        'phone' => $member['phone'] ?? '',
                        'city' => $member['city'] ?? '',
                        'area' => $member['area'] ?? '',
                        'address' => $member['address'] ?? '',
                    ]
                ]);
            } else {
                session_destroy();
                echo json_encode([
                    'valid' => false,
                    'reason' => 'session-invalid'
                ]);
            }
        } else {
            echo json_encode([
                'valid' => false,
                'reason' => 'no-token'
            ]);
        }
        exit;
    }

?>