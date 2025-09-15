<?php

include '../pdo.php';


session_start();

if (isset($_SESSION['memberID'])) {
    echo json_encode([
        'success' => true,
        'memberID' => $_SESSION['memberID']
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => '尚未登入'
    ]);
}















?>