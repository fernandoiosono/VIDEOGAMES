require('dotenv').config();
const axios = require('axios');
const { Op } = require('sequelize');
const { Games, GamesGenres, Genres } = require('../../database/database.js');

const { RAWG_URL_GAMES, RAWG_API_KEY } = process.env;

const getGamesByName = async (name) => {
    let countGames = 15;
    const arrGames = [];

    // Get Games From DataBase @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    const dataGames = await Games.findAll({
        where: {
            name: {
                [Op.iLike]: `%${name}%`
            }
        }
    });

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

    countGames -= dataGames.length;
    
    // Get Games From API @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    let nextPage = `${RAWG_URL_GAMES}?key=${RAWG_API_KEY}&search=${name}`;

    do {
        const { data } = await axios(nextPage);

        for (let x = 0; x < data.results.length; x++) {
            if (countGames){
                const dataGame = data.results[x];
    
                const game = { id: dataGame.id, 
                    name: dataGame.name, 
                    image: dataGame.background_image,
                    rating: dataGame.rating,
                    genres: getArrNames(dataGame.genres, 'genre', 'api') };
                
                arrGames.push(game);
                countGames -= 1;
            } else {
                return arrGames; // Si a mitad de una página ya se cumplió la meta de juegos, sale de la función
            }
        }

        nextPage = data.next;
    } while (nextPage); // Soporta paginado, aun cuando cada página trae 20 por el momento

    if (!arrGames.length) throw new Error('Game Not Found :(');

    return arrGames;
};

const getArrNames = (obj, type, origin) => { // Get an Ordered Array of ID Genres
    const arrIDs = [];

    for (let x = 0; x < obj.length; x++) {
        const name = obj[x].name;

        arrIDs.push(name);
    }

    return arrIDs;
};

module.exports = getGamesByName;