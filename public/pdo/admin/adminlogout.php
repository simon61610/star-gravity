<?php
header("Content-Type: application/json; charset=UTF-8");
// include('cors.php');
session_start();
session_unset();
session_destroy();

echo json_encode(["success" => true],JSON_UNESCAPED_UNICODE);

?>