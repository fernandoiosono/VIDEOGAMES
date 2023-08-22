require('dotenv').config();
const axios = require('axios');
const { Games, GamesGenres, Genres } = require('../../database/database.js');

const { RAWG_URL_GAMES, RAWG_API_KEY } = process.env;
let nextPage = `${RAWG_URL_GAMES}?key=${RAWG_API_KEY}`;

const getGames = async () => {
    const arrGames = [];

    // Get Games From DataBase @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    const dataGames = await Games.findAll();

    for (let x = 0; x < dataGames.length; x++) {
        const arrGenres = [];
        const dataGame = dataGames[x].dataValues;

        const idGenres = await GamesGenres.findAll({
            where: { idGame: dataGame.idGame },
            attributes: ['idGenre']
        });

        for (let x = 0; x < idGenres.length; x++) {
            const nameGenres = await Genres.findOne({
                where: { idGenre: idGenres[x].dataValues.idGenre },
                attributes: ['name']
            });

            arrGenres.push(nameGenres.dataValues.name);
        }

        const game = { id: dataGame.idGame, 
            name: dataGame.name, 
            image: dataGame.image,
            rating: dataGame.rating,
            genres: arrGenres };

        arrGames.push(game);
    }
    
    // Get Games From API @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    do {
        const { data } = await axios(nextPage);

        for (let x = 0; x < data.results.length; x++) {
            const obj = data.results[x];
            
            const game = { id: obj.id, 
                name: obj.name, 
                image: obj.background_image,
                rating: obj.rating,
                genres: getArrNames(obj.genres, 'genre', 'api') };

            arrGames.push(game);
        }

        nextPage = data.next;
    } while (arrGames.length < 21);

    return arrGames;
};

const getArrNames = (obj, type, origin) => { // Get an Ordered Array of ID Genres
    const arrIDs = [];

    for (let x = 0; x < obj.length; x++) {
        const name = 
            (origin === "database")
                ? (type === "genre")
                    ? obj[x].dataValues.name
                    : obj[x].dataValues.name
                : (type === "genre")
                    ? obj[x].name
                    : obj[x].platform.name;

        arrIDs.push(name);
    }

    return arrIDs;
};

module.exports = getGames;