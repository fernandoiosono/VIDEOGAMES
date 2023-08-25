const { Game } = require('../database/database.js');

const newGameDataIsValid = async (data) => {
    switch (true) { // Use Switch to Optimize Validations
        case !data.name:
            throw new Error("Please Enter the Game's Name!");
        case !data.description:
            throw new Error("Please Enter the Game's Description!");
        case !data.image:
            throw new Error("Please Enter the Game's Image URL!");
        case !data.rating:
            throw new Error("Please Enter the Game's Rating! (Must Be More Than 0)");
        case !data.genres:
            throw new Error('Please Enter One Genre At Least!');
        case !data.genres.length:
            throw new Error('Please Enter One Genre At Least!');
        case !data.platforms:
            throw new Error('Please Enter One Platform At Least!');
        case !data.platforms.length:
            throw new Error('Please Enter One Platform At Least!');
        default:
            const nameExists = await Game.findOne({
                where: { name: data.name }
            });

            if (nameExists) throw new Error('A Game with the Same Name Already Exists in the Database! Please Enter Another Name!')
    };

    return true;
};

module.exports = newGameDataIsValid;