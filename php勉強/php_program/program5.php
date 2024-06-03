<?php
echo "こんにちは。";

$dsn = 'mysql:dbname=test;host=127.0.0.1';
$user = 'root';
$password = 'shun5959';

$fruit = "grape";
$color = "purple";

try {
    $dbh = new PDO($dsn, $user, $password);
    echo "接続に成功しました<br>";

    $stmt = $dbh->prepare("INSERT INTO fruit VALUES (':fruit',':color');");
    $stmt->bindValue(":fruit", $fruit, PDO::PARAM_STR);
    $stmt->bindValue(":color", $color, PDO::PARAM_STR);
    $stmt->execute();
    $result = $stmt->fetchAll();
    print_r($result);

} catch (PDOException $e) {
    echo "接続に失敗しました<br>";
    echo $e->getMessage();
}