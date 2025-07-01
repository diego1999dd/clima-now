// Testes unitários para getWeatherIconAndDesc
const { getWeatherIconAndDesc } = require('../api/weather-utils');

describe('getWeatherIconAndDesc', () => {
    it('deve retornar ícone e descrição para céu limpo', () => {
        expect(getWeatherIconAndDesc(0)).toEqual({
            icon: '☀️',
            desc: 'Céu limpo',
            formal: 'O tempo está limpo e ensolarado.'
        });
    });

    it('deve retornar ícone e descrição para chuva forte', () => {
        expect(getWeatherIconAndDesc(65)).toEqual({
            icon: '🌧️',
            desc: 'Chuva forte',
            formal: 'Chuva forte está ocorrendo.'
        });
    });

    it('deve retornar desconhecido para código inválido', () => {
        expect(getWeatherIconAndDesc(999)).toEqual({
            icon: '❓',
            desc: 'Desconhecido',
            formal: 'Condição climática desconhecida.'
        });
    });
});
