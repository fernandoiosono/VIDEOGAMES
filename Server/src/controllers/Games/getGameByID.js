require('dotenv').config();
const axios = require('axios');

const { Game, 
    Genre,
    Platform } = require('../../database/database.js');

const { RAWG_URL_GAMES, RAWG_API_KEY } = process.env;

const getGameByID = async (pID) => {
    if (isNaN(pID)) {
        const game = await Game.findOne({
            where: { idGame: pID },
            include: [
                { model: Genre, attributes: ['name'] },
                { model: Platform, attributes: ['name'] }
            ]
        });

        game.dataValues.genres = game.dataValues.Genres.map(genre => genre.dataValues.name);
        game.dataValues.platforms = game.dataValues.Platforms.map(platform => platform.dataValues.name);

        delete game.dataValues.Genres;
        delete game.dataValues.Platforms;

        return game;
    } else {
        const { data } = await axios(`${RAWG_URL_GAMES}/${pID}?key=${RAWG_API_KEY}`);

        const game = {
            idGame: data.id,
            name: data.name,
            image: data.background_image,
            released: data.released,
            rating: data.rating,
            description: data.description,
            genres: data.genres.map(genre => genre.name),
            platforms: data.platforms.map(platform => platform.platform.name)
        }

        return game;
    }
};

module.exports = getGameByID;