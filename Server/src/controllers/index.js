const getGenres = require('./Genres/getGenres.js');
const getVGByID = require('./Videogames/getVGByID.js');
const getVGByName = require('./Videogames/getVGByName.js');
const getVideogames = require('./Videogames/getVideogames.js');
const postVideogame = require('./Videogames/postVideogame.js');

module.exports = {
    getGenres,
    getVGByID,
    getVGByName,
    getVideogames,
    postVideogame
};