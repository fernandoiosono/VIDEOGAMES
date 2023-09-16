require('dotenv').config();
const axios = require('axios');
const { Op } = require('sequelize');
const { Game, Genre } = require('../../database/database.js');

const { RAWG_URL_GAMES, RAWG_API_KEY, QTY_GAMES_BYNAME } = process.env;

const getGamesByName = async (name) => {
    let countGames = QTY_GAMES_BYNAME;
    const arrGames = [];

    // Get Games From DataBase @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    const dataGames = await Game.findAll({
        attributes: ['idGame', 'name', 'image', 'rating'],
        where: {
            name: {
                [Op.iLike]: `%${name}%`
            }
        },
        include: [
            { model: Genre, attributes: ['name'] }
        ]
    });

    for (let x = 0; x < dataGames.length; x++) {
        const game = dataGames[x].dataValues;

        game.genres = game.Genres.map(genre => genre.dataValues.name);

        delete game.Genres;

        arrGames.push(game);
    }

    countGames -= arrGames.length;
    
    // Get Games From API @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    let nextPage = `${RAWG_URL_GAMES}?key=${RAWG_API_KEY}&search=${name}`;

    do {
        const { data } = await axios(nextPage);

        for (let x = 0; x < data.results.length; x++) {
            if (countGames){
                const obj = data.results[x];
    
                const game = { idGame: obj.id, 
                    name: obj.name, 
                    image: obj.background_image,
                    rating: obj.rating,
                    genres: obj.genres.map(genre => genre.name) };
                
                arrGames.push(game);
                countGames -= 1;
            } else {
                return arrGames; // Si a mitad de una página ya se cumplió la meta de juegos, sale de la función
            }
        }

        nextPage = data.next;
    } while (nextPage); // Soporta paginado, aun cuando cada página trae 20 por el momento

    if (!arrGames.length) throw new Error('Games Not Found :(');

    return arrGames;
};

module.exports = getGamesByName;