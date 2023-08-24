const { DataTypes: dtype } = require('sequelize');

module.exports = (database) => {
    database.define('Platform', {
        idPlatform: {
            type: dtype.INTEGER,
            primaryKey: true
        },
        name: {
            type: dtype.STRING,
            unique: true,
            allowNull: false
        }
    },{
        timestamps: false
    });
};