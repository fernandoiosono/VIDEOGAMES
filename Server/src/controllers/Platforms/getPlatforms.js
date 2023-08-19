require('dotenv').config();
const axios = require('axios');
const { Platforms } = require('../../database/database.js');

const { RAWG_URL_PLATFORMS, RAWG_API_KEY } = process.env;

const getPlatforms = async () => {
    const arrResult = [];
    const platformsDB = await Platforms.findAll();
    let nextPage = `${RAWG_URL_PLATFORMS}?key=${RAWG_API_KEY}`;

    do {
        const { data } = await axios(nextPage);

        for (let x = 0; x < data.results.length; x++) {
            const platform = data.results[x];
            const obj = { id: platform.id, name: platform.name };
            
            arrResult.push(obj);
        }
    
        arrResult.sort((a, b) => { return a.id - b.id });

        nextPage = data.next;
    } while (nextPage);
    
    if (!platformsDB.length) await Platforms.bulkCreate(arrResult);
    
    return arrResult;
};

module.exports = getPlatforms;