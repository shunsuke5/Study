<?php

$dsn = 'mysql:dbname=test;host=127.0.0.1';
$user = 'root';
$password = 'root';

try {
    $dbh = new PDO($dsn, $user, $password);
    echo '接続に成功しました<br>';

    $stmt = $dbh->prepare("INSERT INTO fruit VALUES (:fruit, :color);");
    $stmt->bindValue(":fruit", $_POST['fruit'], PDO::PARAM_STR);
    $stmt->bindValue(":color", $_POST['color'], PDO::PARAM_STR);
    $isQuerySuccess = $stmt->execute();
    if ($isQuerySuccess) {
        echo "クエリが成功しました";
    } else {
        echo "クエリが失敗しました";
    }

} catch (PDOException $e) {
    echo "接続に失敗しました";
    echo $e->getMessage();
}