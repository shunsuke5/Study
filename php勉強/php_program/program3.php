<?php
error_reporting(E_ALL);

$arr = array('fruit' => 'apple', 'veggie' => 'carrot');

// 正しい
print $arr['fruit'];    // apple
print $arr['veggie'];   // carrot

// 間違い。動作するが、未定義の定数fruitを使用しているため、
// 同時にE_NOTICEレベルのPHPエラーを発生する。
print $arr[fruit];  // apple

// 検証のため、定数を定義してみる。
// fruitと言う名前の定数に値'veggie'を代入する。
define('fruit', 'veggie');

// ここでは、出力が異なることに注意する。
print $arr['fruit'];    // apple
print $arr[fruit];      // carrot

// 以下は文字列の中であるためOK。定数は、文字列の中では
// 解釈されないため、E_NOTICEエラーはここでは発生しない。
print "Hello $arr[fruit]";  // Hello apple

// 例外が1つあり、文字列の中で波括弧で配列をくくった場合には、
// 定数が解釈される
print "Hello {$arr[fruit]}";    // Hello carrot
print "Hello {$arr['fruit']}";  // Hello apple

// これは動作せず、パースエラーを発生する。
print "Hello $arr['fruit']";
print "Hello $_GET['foo']";

// 文字列結合で同じことをすることもできる
print "Hello " . $arr['fruit']; // Hello apple