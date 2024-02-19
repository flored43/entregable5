const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Director = sequelize.define('director', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nacionality: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    birthday: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
});

module.exports = Director;