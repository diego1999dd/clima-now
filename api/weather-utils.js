// Função pura para testes e uso no app
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

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = { getWeatherIconAndDesc };
}
