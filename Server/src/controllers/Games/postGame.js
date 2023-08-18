require('dotenv').config();
const axios = require('axios');
// const { Games } = require('../../database/database.js');

const { RAWG_URL_GAMES, RAWG_API_KEY } = process.env;

const postVideogame = async () => {
    const { data } = await axios(`${RAWG_URL_GAMES}?key=${RAWG_API_KEY}`);

    return data;
};

module.exports = postVideogame;