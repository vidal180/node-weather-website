console.log('Cliente server inicialized!');

const form = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const address = search.value;
    messageOne.textContent = `Loading weather information for ${address}`;
    messageTwo.textContent = '';
    const url = `http://localhost:3000/weather?address=${address}`;

    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = '';
                messageTwo.textContent = data.error;
                console.log(data.error);
            } else {
                messageOne.textContent = data.namePlace;
                messageTwo.textContent = data.forecastData;
                console.log(data.forecastData);
                console.log(data.namePlace);
                console.log(data.address);
            }
        })
    });
})