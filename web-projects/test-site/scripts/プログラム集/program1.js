const myImage = document.querySelector("img");

myImage.onclick = () => {
    const mySrc = myImage.getAttribute("src");
    if (mySrc === "images/test.png") {
        myImage.setAttribute("src", "images/overwatch2.png");
    } else {
        myImage.setAttribute("src", "images/test.png");
    }
};

let myButton = document.querySelector("button");
let myHeading = document.querySelector("h1");

function setUserName() {
    const myName = prompt("あなたの名前を入力してください。");
    if (!myName) {
        setUserName();
    } else {
        localStorage.setItem("name", myName);
        myHeading.textContent = `Mozilla はかっこいいよ、${myName}さん、Mozilla はかっこいいよ。`;
    }
}

if (!localStorage.getItem("name")) {
    setUserName();
} else {
    const storedName = localStorage.getItem("name");
    myHeading.textContent = `Mozilla はかっこいいよ、${storedName}さん`;
}

myButton.onclick = () => {
    setUserName();
}