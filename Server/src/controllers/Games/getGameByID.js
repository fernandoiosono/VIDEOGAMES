require('dotenv').config();
const axios = require('axios');
// const { Games } = require('../../database/database.js');

const { RAWG_URL_GAMES, RAWG_API_KEY } = process.env;

const getVGByID = async (id) => {
    const { data } = await axios(`${RAWG_URL_GAMES}/${id}?key=${RAWG_API_KEY}`);

    return data;
};

module.exports = getVGByID;