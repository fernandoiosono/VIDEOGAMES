require('dotenv').config();
const { Game } = require('../../database/database.js');

const { newGameDataIsValid, 
    newGameID } = require('../../helpers');

const postGame = async (data) => {
    if (await newGameDataIsValid(data)) {
        data.idGame = await newGameID();

        const gameCreated = await Game.create(data);

        gameCreated.addGenres(data.genres);
        gameCreated.addPlatforms(data.platforms);

        return gameCreated;
    }
};

module.exports = postGame;