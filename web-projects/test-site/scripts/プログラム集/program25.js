// 必要な定数を作成
const rememberDiv = document.querySelector(".remember");
const foregetDiv = document.querySelector(".forget");
const form = document.querySelector("form");
const nameInput = document.querySelector("#entername");
const submitBtn = document.querySelector("#submitname");
const forgetBtn = document.querySelector("#forgetname");

const h1 = document.querySelector("h1");
const personalGreeting = document.querySelector(".personal-greeting");

// ボタンが押されたときにフォームを送信しないようにする
form.addEventListener("submit", (e) => e.preventDefault());

// "Say hello"ボタンがクリックされたら関数を実行する
submitBtn.addEventListener("click", () => {
    // 入力された名前をwebストレージに保存
    localStorage.setItem("name", nameInput.value);
    // nameDisplayCheck()を動作させ、パーソナライズされた挨拶の表示と、
    // フォームの表示を更新する
    nameDisplayCheck();
});

// "Forget"ボタンがクリックされたら関数を実行する
forgetBtn.addEventListener("click", () => {
    // 保存してある名前をwebストレージから削除
    localStorage.removeItem("name");
    // 再び nameDisplayCheck() を実行して、一般的な挨拶を表示するとともに
    // フォーム表示を更新する
    nameDisplayCheck();
});

// nameDisplayCheck() と言う関数を定義する
function nameDisplayCheck() {
    // "name" というデータ項目がwebストレージに保存されているかどうかを調べる
    if (localStorage.getItem("name")) {
        // もし保存されていたら、個人に合わせた挨拶を表示
        const name = localStorage.getItem("name");
        h1.textContent = `Welcome, ${name}`;
        personalGreeting.textContent = `Welcome to our website, ${name}! We hope you have fun while you are here.`;
        // フォームのうち"remember"の部分を隠し、"forget"の部分を表示
        foregetDiv.style.display = "block";
        rememberDiv.style.display = "none";
    } else {
        // もし保存されていなければ、一般的な挨拶を表示
        h1.textContent = "Welcome to our website ";
        personalGreeting.textContent = "Welcome to our website. We hope you have fun while you are here.";
        // フォームのうち、"forget"の部分を隠し、"remember"の部分を表示
        foregetDiv.style.display = "none";
        rememberDiv.style.display = "block";
    }
}

nameDisplayCheck();