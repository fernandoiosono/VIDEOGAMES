require('dotenv').config();
const axios = require('axios');

const { RAWG_URL_GENRES, RAWG_API_KEY } = process.env;

const getGenres = async () => {
    const { data } = await axios(`${RAWG_URL_GENRES}?key=${RAWG_API_KEY}`);

    const arrResult = [];

    for (let x = 0; x < data.results.length; x++) {
        const genre = data.results[x];
        const obj = { id: genre.id, name: genre.name };
        
        arrResult.push(obj);
    }

    arrResult.sort((a, b) => { return a.id - b.id });
    
    return arrResult;
};

module.exports = getGenres;