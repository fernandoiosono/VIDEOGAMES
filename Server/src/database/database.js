require('dotenv').config();
const { Sequelize } = require('sequelize');

const { defineGame, 
    defineGenre, 
    definePlatform } = require('./models');

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const conn = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;

const database = new Sequelize(conn, { logging: false });

defineGame(database);
defineGenre(database);
definePlatform(database);

const { Games, Genres, Platforms } = database.models;

Games.belongsToMany(Genres, { 
    through: "GamesGenres",
    foreignKey: "idGame",
    otherKey: "idGenre",
    timestamps: false
});

Genres.belongsToMany(Games, { 
    through: "GamesGenres",
    foreignKey: "idGenre",
    otherKey: "idGame",
    timestamps: false
});

Games.belongsToMany(Platforms, { 
    through: "GamesPlatforms",
    foreignKey: "idGame",
    otherKey: "idPlatform",
    timestamps: false
});

Platforms.belongsToMany(Games, { 
    through: "GamesPlatforms",
    foreignKey: "idPlatform",
    otherKey: "idGame",
    timestamps: false
});

module.exports = {
    database,
    ...database.models
};