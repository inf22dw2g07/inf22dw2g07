const Sequelize = require('sequelize');
const database = require('../db');


const Artista = database.define('artista', {
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

    pais: {
        type: Sequelize.STRING,
        allowNull: false
    }
})


module.exports = Artista;