const db = require('./db');

const Carrinho = db.sequelize.define('encomenda', {
    idProd: {
        type: db.Sequelize.INTEGER
    },
    idUser: {
        type: db.Sequelize.INTEGER
    }
});

/*Carrinho.sync({force: true}); /* Isto deve continuar Comentado */

module.exports = Carrinho;