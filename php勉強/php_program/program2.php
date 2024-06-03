<?php
$source_array = ["foo" => 1, "bar" => 2, "baz" => 3];

// source_array配列の、インデックス "baz"の要素を、変数$threeに代入する。
["baz" => $three] = $source_array;

echo $three;    // 3 を出力する。

$source_array = ["foo", "bar", "baz"];

// source_array配列の、インデックス 2 の要素を、変数 $baz に代入する。
[2 => $baz] = $source_array;

echo $baz;      // "baz" を出力する。