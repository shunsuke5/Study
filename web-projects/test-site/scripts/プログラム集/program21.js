const ullist = document.querySelector("ul");
const input = document.querySelector("input");
const button = document.querySelector("button");


button.addEventListener("click", () => {
  const inputItem = input.value;
  input.value = "";

  const list = document.createElement("li");
  const span = document.createElement("span");
  const completeButton = document.createElement("button");

  list.appendChild(span);
  span.textContent = inputItem;
  list.appendChild(completeButton);
  completeButton.textContent = "削除";
  ullist.appendChild(list);

  completeButton.addEventListener("click", () => {
    ullist.removeChild(list);
    input.focus();
  });
});