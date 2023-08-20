const { DataTypes: dtype } = require('sequelize');

module.exports = (database) => {
    database.define('Games', {
        idGame: {
            type: dtype.UUID,
            defaultValue: dtype.UUIDV4,
            primaryKey: true
        },
        name: {
            type: dtype.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: dtype.STRING,
            allowNull: false
        },
        image: {
            type: dtype.STRING,
            allowNull: false
        },
        released: {
            type: dtype.DATE,
            defaultValue: dtype.NOW
        },
        rating: {
            type: dtype.DECIMAL,
            defaultValue: 0
        }
    },{
        timestamps: false
    });
};