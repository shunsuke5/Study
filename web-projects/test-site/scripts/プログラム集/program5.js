const select = document.querySelector('select');
const para = document.querySelector('p');

select.onchange = setWeather;

function setWeather() {
    const choice = select.value;

    if (choice === 'sunny') {
        para.textContent = '今日はとてもいい天気です';
    } else if (choice === 'rainy') {
        para.textContent = '外は雨が降っています';
    } else if (choice === 'snowing') {
        para.textContent = '雪が降ってとても寒いです';
    } else if (choice === 'overcast') {
        para.textContent = '雨は降っていないが空は暗い';
    } else {
        para.textContent = '';
    }
}