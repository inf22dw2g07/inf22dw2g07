const Sequelize = require('sequelize');
const database = require('../db');


const Musica = database.define('musica', {
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

    genero: {
        type: Sequelize.STRING,
        allowNull: false
    },

    idartista: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    datadelancamento: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    idalbum: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})



module.exports = Musica;