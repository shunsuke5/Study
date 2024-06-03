const name = document.querySelector("#name");
const delay = document.querySelector("#delay");
const button = document.querySelector("#set-alarm");
const output = document.querySelector("#output");

function alarm(person, delay) {
  return new Promise((resolve,reject) => {
    if (delay < 0) {
      throw new Error("アラームの待ち時間を負数にすることはできません。");
    }
    setTimeout(() => {
      resolve(`${person}、起きて！`);
    }, delay);;
  });
}

button.addEventListener("click", async () => {
  try {
    const message = await alarm(name.value, delay.value);
    output.textContent = message;
  } catch (error) {
    output.textContent = `アラームを設定できません: ${error}`;
  }
});