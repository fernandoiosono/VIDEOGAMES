require('dotenv').config();
const axios = require('axios');

const { Games, 
    GamesGenres, 
    GamesPlatforms } = require('../../database/database.js');

const { RAWG_URL_GAMES, RAWG_API_KEY } = process.env;

const getVGByID = async (pID) => {
    if (isNaN(pID)) {
        const dataGame = await Games.findOne({
            where: { idGame: pID }

            // Checar por qué este código no funciona
            // Arroja un Error que dice que no hay relación entre las tablas :(
            // Al parecer con este código nos ahorraríamos la siguientes 2 consultas...

            // include: [
            //     { model: GamesGenres, attributes: 'idGenre' },
            //     { model: GamesPlatforms, attributes: 'idPlatform' }
            // ]
        });

        const genres = await GamesGenres.findAll({
            where: { idGame: pID },
            attributes: ['idGenre']
        });

        const platforms = await GamesPlatforms.findAll({
            where: { idGame: pID },
            attributes: ['idPlatform']
        });

        const { name, image, released, rating,
            description } = dataGame;

            const game = { id: pID, name, image, released, rating, description,
                genres: getArrIDs(genres, 'genre', 'database'), 
                platforms: getArrIDs(platforms, 'platform', 'database') };

        return game;
    } else {
        const { data } = await axios(`${RAWG_URL_GAMES}/${pID}?key=${RAWG_API_KEY}`);

        const { id, name, background_image, released, rating,
            description, platforms, genres } = data;

        const game = { id, name, image: background_image, released, rating, description,
            genres: getArrIDs(genres, 'genre', 'api'), 
            platforms: getArrIDs(platforms, 'platform', 'api') };

        return game;
    }
};

const getArrIDs = (obj, type, origin) => { // Get an Ordered Array of ID Genres
    const arrIDs = [];

    for (let x = 0; x < obj.length; x++) {
        const id = 
            (origin === "database")
                ? (type === "genre")
                    ? obj[x].dataValues.idGenre
                    : obj[x].dataValues.idPlatform
                : (type === "genre")
                    ? obj[x].id
                    : obj[x].platform.id;

        arrIDs.push(id);
    }

    arrIDs.sort((a, b) => { return a - b });

    return arrIDs;
};

module.exports = getVGByID;