require('dotenv').config();
const axios = require('axios');
const { Game, GameGenre, Genre } = require('../../database/database.js');

const { RAWG_URL_GAMES, RAWG_API_KEY } = process.env;
let nextPage = `${RAWG_URL_GAMES}?key=${RAWG_API_KEY}`;

const getGames = async () => {
    let countGames = 100;
    const arrGames = [];

    // Get Games From DataBase @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    const dataGames = await Game.findAll();

    for (let x = 0; x < dataGames.length; x++) {
        const arrGenres = [];
        const dataGame = dataGames[x].dataValues;

        const idGenres = await GameGenre.findAll({
            where: { idGame: dataGame.idGame },
            attributes: ['idGenre']
        });

        for (let x = 0; x < idGenres.length; x++) {
            const nameGenres = await Genre.findOne({
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
    do {
        const { data } = await axios(nextPage);

        for (let x = 0; x < data.results.length; x++) {
            if (countGames) {
                const obj = data.results[x];
            
                const game = { id: obj.id, 
                    name: obj.name, 
                    image: obj.background_image,
                    rating: obj.rating,
                    genres: getArrNames(obj.genres) };

                arrGames.push(game);
                countGames -= 1;
            } else {
                return arrGames; // Si a mitad de una página ya se cumplió la meta de juegos, sale de la función
            }
        }

        nextPage = data.next;
    } while (nextPage);

    return arrGames;
};

const getArrNames = (obj) => { // Get an Ordered Array of ID Genres
    const arrNames = [];

    for (let x = 0; x < obj.length; x++) {
        const name = obj[x].name;

        arrNames.push(name);
    }

    return arrNames;
};

module.exports = getGames;