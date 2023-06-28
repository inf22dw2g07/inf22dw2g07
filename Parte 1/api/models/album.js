const Sequelize = require('sequelize');
const database = require('../db');


const Album = database.define('album', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },

    idartista: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})



module.exports = Album;