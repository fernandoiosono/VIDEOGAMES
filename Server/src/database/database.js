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

const { Game, Genre, Platform } = database.models;

Game.belongsToMany(Genre, { 
    through: "GameGenre",
    foreignKey: "idGame",
    otherKey: "idGenre",
    timestamps: false
});

Genre.belongsToMany(Game, { 
    through: "GameGenre",
    foreignKey: "idGenre",
    otherKey: "idGame",
    timestamps: false
});

Game.belongsToMany(Platform, { 
    through: "GamePlatform",
    foreignKey: "idGame",
    otherKey: "idPlatform",
    timestamps: false
});

Platform.belongsToMany(Game, { 
    through: "GamePlatform",
    foreignKey: "idPlatform",
    otherKey: "idGame",
    timestamps: false
});

module.exports = {
    database,
    ...database.models
};