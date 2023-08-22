require('dotenv').config();
const axios = require('axios');
const { Platforms } = require('../../database/database.js');

const { RAWG_URL_PLATFORMS, RAWG_API_KEY } = process.env;

const getPlatforms = async () => {
    const arrPlatforms = [];
    const platformsDB = await Platforms.findAll();
    let nextPage = `${RAWG_URL_PLATFORMS}?key=${RAWG_API_KEY}`;

    do {
        const { data } = await axios(nextPage);

        for (let x = 0; x < data.results.length; x++) {
            const platform = data.results[x];
            const obj = { idPlatform: platform.id, name: platform.name };
            
            arrPlatforms.push(obj);
        }
    
        nextPage = data.next;
    } while (nextPage);

    arrPlatforms.sort((a, b) => { return a.idPlatform - b.idPlatform });
    
    if (!platformsDB.length) await Platforms.bulkCreate(arrPlatforms);
    
    return arrPlatforms;
};

module.exports = getPlatforms;