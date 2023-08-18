require('dotenv').config();
const { Sequelize } = require('sequelize');
const { gameModel, genreModel } = require('./models');

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const conn = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;

const database = new Sequelize(conn, { logging: false });

// gameModel(database);
genreModel(database);

const { Genres } = database.models;

module.exports = {
    database,
    ...database.models
};