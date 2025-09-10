<?php

// 開發階段在本機端用這串
$URL = "mysql:host=localhost:3306;dbname=star";
$USERNAME = "root";
$PASSWORD = "password";
$pdo = new PDO($URL, $USERNAME, $PASSWORD);

// 部屬上緯育前要改用這串
// $db_host = "127.0.0.1";
// $db_user = "tibamefe_since2021";
// $db_pass = "vwRBSb.j&K#E";
// $db_select = "tibamefe_tjd102g1";
// $dsn = "mysql:host=".$db_host.";dbname=".$db_select.";charset=utf8";
// $pdo = new PDO($dsn, $db_user, $db_pass);
