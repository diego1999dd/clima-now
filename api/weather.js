// Funções para buscar dados do clima na Open-Meteo

// Função para mapear weathercode para ícone, descrição curta e descrição formal
function getWeatherIconAndDesc(code) {
    const map = {
        0: { icon: '☀️', desc: 'Céu limpo', formal: 'O tempo está limpo e ensolarado.' },
        1: { icon: '🌤️', desc: 'Principalmente limpo', formal: 'O tempo está predominantemente limpo, com poucas nuvens.' },
        2: { icon: '⛅', desc: 'Parcialmente nublado', formal: 'O tempo está parcialmente nublado.' },
        3: { icon: '☁️', desc: 'Nublado', formal: 'O céu está totalmente nublado.' },
        45: { icon: '🌫️', desc: 'Névoa', formal: 'Há presença de névoa.' },
        48: { icon: '🌫️', desc: 'Névoa', formal: 'Há presença de névoa.' },
        51: { icon: '🌦️', desc: 'Chuvisco leve', formal: 'Chuvisco leve está ocorrendo.' },
        53: { icon: '🌦️', desc: 'Chuvisco moderado', formal: 'Chuvisco moderado está ocorrendo.' },
        55: { icon: '🌦️', desc: 'Chuvisco denso', formal: 'Chuvisco intenso está ocorrendo.' },
        61: { icon: '🌧️', desc: 'Chuva leve', formal: 'Chuva leve está ocorrendo.' },
        63: { icon: '🌧️', desc: 'Chuva moderada', formal: 'Chuva moderada está ocorrendo.' },
        65: { icon: '🌧️', desc: 'Chuva forte', formal: 'Chuva forte está ocorrendo.' },
        71: { icon: '🌨️', desc: 'Neve leve', formal: 'Neve leve está ocorrendo.' },
        73: { icon: '🌨️', desc: 'Neve moderada', formal: 'Neve moderada está ocorrendo.' },
        75: { icon: '🌨️', desc: 'Neve forte', formal: 'Neve forte está ocorrendo.' },
        80: { icon: '🌦️', desc: 'Chuva leve', formal: 'Chuva leve está ocorrendo.' },
        81: { icon: '🌦️', desc: 'Chuva moderada', formal: 'Chuva moderada está ocorrendo.' },
        82: { icon: '🌦️', desc: 'Chuva forte', formal: 'Chuva forte está ocorrendo.' },
        95: { icon: '⛈️', desc: 'Trovoada', formal: 'Trovoada está ocorrendo.' },
        96: { icon: '⛈️', desc: 'Trovoada com granizo leve', formal: 'Trovoada com granizo leve está ocorrendo.' },
        99: { icon: '⛈️', desc: 'Trovoada com granizo forte', formal: 'Trovoada com granizo forte está ocorrendo.' }
    };
    return map[code] || { icon: '❓', desc: 'Desconhecido', formal: 'Condição climática desconhecida.' };
}

// Função para buscar previsão estendida
async function getForecast(latitude, longitude) {
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`);
    return await res.json();
}

// Atualiza a exibição do clima
async function showWeather(city) {
    try {
        const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=pt&format=json`);
        const geoData = await geoRes.json();
        if (!geoData.results || geoData.results.length === 0) throw new Error('Cidade não encontrada');
        const { latitude, longitude, name } = geoData.results[0];

        // Clima atual
        const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
        const weatherData = await weatherRes.json();
        if (!weatherData.current_weather) throw new Error('Dados de clima não encontrados');
        const { temperature, windspeed, winddirection, weathercode } = weatherData.current_weather;
        const { icon, desc, formal } = getWeatherIconAndDesc(weathercode);

        // Previsão
        const forecastData = await getForecast(latitude, longitude);
        let forecastHtml = '';
        if (forecastData.daily) {
            forecastHtml = '<div id="forecast">';
            for (let i = 0; i < forecastData.daily.time.length; i++) {
                const day = forecastData.daily.time[i];
                // Formata data para dd/mm/yyyy
                const [yyyy, mm, dd] = day.split('-');
                const brDate = `${dd}/${mm}/${yyyy}`;
                const tmin = forecastData.daily.temperature_2m_min[i];
                const tmax = forecastData.daily.temperature_2m_max[i];
                const wcode = forecastData.daily.weathercode[i];
                const { icon: ficon, desc: fdesc, formal: fformal } = getWeatherIconAndDesc(wcode);
                forecastHtml += `<div id="forecast-day"><span>${brDate}</span> <span class="icon">${ficon}</span> <span class="desc">${fdesc}</span> <span>${tmin}°C / ${tmax}°C</span></div>`;
            }
            forecastHtml += '</div>';
        }

        document.getElementById('app').innerHTML = `
            <div class="icon">${icon}</div>
            <div class="temp">${temperature}°C</div>
            <div class="desc">${desc}</div>
            <div class="formal">${formal}</div>
            <div class="details">Vento: ${windspeed} km/h (${winddirection}°)</div>
            <div class="details">Cidade: <b>${name}</b></div>
            ${forecastHtml}
        `;
        setWeatherBackground(weathercode);
    } catch (err) {
        document.getElementById('app').innerHTML = `<div style="color:red;">${err.message}</div>`;
    }
}

// Função para definir o fundo com base no código do tempo
function setWeatherBackground(weathercode) {
    const body = document.body;
    body.className = ''; // Reseta classes
    if (weathercode >= 0 && weathercode <= 1) {
        body.classList.add('bg-sun'); // Céu limpo
    } else if (weathercode === 2 || weathercode === 3) {
        body.classList.add('bg-cloud'); // Parcialmente nublado/nublado
    } else if (weathercode >= 45 && weathercode <= 48) {
        body.classList.add('bg-fog');
    } else if (weathercode >= 51 && weathercode <= 55) {
        body.classList.add('bg-rain'); // Chuvisco
    } else if (weathercode >= 61 && weathercode <= 65) {
        body.classList.add('bg-rain');
    } else if (weathercode >= 71 && weathercode <= 75) {
        body.classList.add('bg-snow');
    } else if (weathercode >= 80 && weathercode <= 82) {
        body.classList.add('bg-rain');
    } else if (weathercode >= 95 && weathercode <= 99) {
        body.classList.add('bg-storm');
    } else {
        body.classList.add('bg-sun'); // Padrão: céu limpo
    }

    if (body.classList.contains('bg-rain')) {
        setTimeout(createRain, 100);
    } else {
        document.querySelectorAll('.rain-drop').forEach(e => e.remove());
    }
}

// Função para animar gotas de chuva
function createRain() {
    // Remove gotas antigas
    document.querySelectorAll('.rain-drop').forEach(e => e.remove());
    if (!document.body.classList.contains('bg-rain')) return;
    for (let i = 0; i < 40; i++) {
        const drop = document.createElement('div');
        drop.className = 'rain-drop';
        drop.style.left = Math.random() * 100 + 'vw';
        drop.style.top = '0';
        drop.style.animationDelay = (Math.random() * 1.2) + 's';
        drop.style.height = (12 + Math.random() * 16) + 'px';
        document.body.appendChild(drop);
    }
}

// Lida com o formulário de busca
window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('search-form');
    const input = document.getElementById('city-input');
    form.addEventListener('submit', e => {
        e.preventDefault();
        showWeather(input.value.trim() || 'São Paulo');
    });
    // Mostra São Paulo por padrão
    showWeather('São Paulo');
});
