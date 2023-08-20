require('dotenv').config();
const axios = require('axios');
const { Games } = require('../../database/database.js');

const { RAWG_URL_GAMES, RAWG_API_KEY } = process.env;

const getVGByID = async (pID) => {
    if (isNaN(pID)) {
        const game = await Games.findOne({
            where: { id: pID }
        });

        // const { id, name, image, released, rating,
        //     description/*, platforms, genres*/ } = game;

        //     const obj = { id, name, image, released, rating,
        //         // genres: getArrIDs(genres, 'genre'), 
        //         // platforms: getArrIDs(platforms, 'platform'), 
        //         description };

        return game;
    } else {
        const { data } = await axios(`${RAWG_URL_GAMES}/${pID}?key=${RAWG_API_KEY}`);

        const { id, name, background_image, released, rating,
            description, platforms, genres } = data;

        const obj = { id, name, image: background_image, released, rating,
            genres: getArrIDs(genres, 'genre'), 
            platforms: getArrIDs(platforms, 'platform'), 
            description };

        return obj;
    }
};

const getArrIDs = (obj, type) => { // Get an Ordered Array of ID Genres
    const arrIDs = [];

    for (let x = 0; x < obj.length; x++) {
        const id = (type === 'genre') 
            ? obj[x].id
            : obj[x].platform.id;

        arrIDs.push(id);
    }

    arrIDs.sort((a, b) => { return a - b });

    return arrIDs;
};

module.exports = getVGByID;