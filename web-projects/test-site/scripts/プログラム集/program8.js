const contacts = [
    "クリス:2232322",
    "サラ:3453456",
    "ビル:7654322",
    "メアリー:9998769",
    "ダイアン:9384975",
];
const para = document.querySelector("p");
const input = document.querySelector("input");
const btn = document.querySelector("button");

btn.addEventListener("click", () => {
    const searchName = input.value.toLowerCase();
    input.value = "";
    input.focus();
    para.textContent = "";
    for (const contact of contacts) {
        const splitContact = contact.split(":");
        if (splitContact[0].toLowerCase() === searchName) {
            para.textContent = `${splitContact[0]}の電話番号は${splitContact[1]}です。`;
            break;
        }
    }
    if (para.textContent === "") {
        para.textContent = "連絡先が見つかりません。";
    }
});