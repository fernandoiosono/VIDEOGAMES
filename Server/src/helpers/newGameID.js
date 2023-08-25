const uuid = require('uuid');
const { Game } = require('../database/database.js');

const newGameID = async () => {
    let idExists = {};
    let id = uuid.v4();

    do { // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Unique ID Generator Cycle 
        idExists = await Game.findOne({ where: { idGame: id } });

        if (idExists) id = uuid.v4();
    } while (idExists); // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

    return id;
};

module.exports = newGameID;