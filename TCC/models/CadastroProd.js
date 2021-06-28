const db = require('./db');
const { Sequelize } = require('./db');

const CadastroProd = db.sequelize.define('produtos', {
    nome: {
        type: db.Sequelize.STRING
    },
    preco: {
        type: db.Sequelize.INTEGER
    },
    descricao: {
        type: db.Sequelize.TEXT
    },
    categoria: {
        type: db.Sequelize.STRING
    },
    img: {
        type: db.Sequelize.STRING
    },
    _idUser: {
        type: db.Sequelize.INTEGER
    }
});

/*CadastroProd.sync({force: true}); /* isto deve continuar comentado */

module.exports = CadastroProd;