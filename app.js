// Carrega o script da API e usa a função global
const script = document.createElement('script');
script.src = 'api/weather.js';
document.head.appendChild(script);

script.onload = async function () {
    const city = prompt('Digite o nome da cidade:');
    if (!city) {
        alert('Cidade não informada.');
        return;
    }
    try {
        const weather = await window.getCurrentWeatherByCity(city);
        document.getElementById('app').innerHTML = `Temperatura atual em <b>${weather.city}</b>: ${weather.temperature}°C`;
    } catch (err) {
        alert(err.message);
    }
};
