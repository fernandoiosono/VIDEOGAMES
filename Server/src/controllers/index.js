const getGenres = require('./Genres/getGenres.js');
const getGameByID = require('./Games/getGameByID.js');
const getGames = require('./Games/getGames.js');
const getGamesByName = require('./Games/getGamesByName.js');
const postGame = require('./Games/postGame.js');
const getPlatforms = require('./Platforms/getPlatforms.js');


module.exports = {
    getGenres,
    getGameByID,
    getGames,
    getGamesByName,
    postGame,
    getPlatforms
};