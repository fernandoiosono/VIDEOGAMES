require('dotenv').config();
const axios = require('axios');
const { Genre } = require('../../database/database.js');

const { RAWG_URL_GENRES, RAWG_API_KEY } = process.env;

const getGenres = async () => {
    const arrGenres = [];
    const genresDB = await Genre.findAll();
    let nextPage = `${RAWG_URL_GENRES}?key=${RAWG_API_KEY}`;

    do {
        const { data } = await axios(nextPage);

        for (let x = 0; x < data.results.length; x++) {
            const genre = data.results[x];
            
            const obj = { idGenre: genre.id, 
                name: genre.name, 
                slug: genre.slug };
            
            arrGenres.push(obj);
        }
    
        nextPage = data.next;
    } while (nextPage);

    arrGenres.sort((a, b) => { return a.idGenre - b.idGenre });

    if (!genresDB.length) await Genre.bulkCreate(arrGenres);
    
    return arrGenres;
};

module.exports = getGenres;