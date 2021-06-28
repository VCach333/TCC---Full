const db = require('./db');

const CadastroUser = db.sequelize.define('usuarios', {
    nome: {
        type: db.Sequelize.STRING
    },
    email: {
        type: db.Sequelize.STRING
    },
    admin: {
        type: db.Sequelize.INTEGER
    },
    senha: {
        type: db.Sequelize.STRING
    }, 
    telefone: {
        type: db.Sequelize.STRING
    },
    endereco: {
        type: db.Sequelize.STRING
    }
});

/*CadastroUser.sync({force: true}); /*isto deve continuar comentado */

module.exports = CadastroUser;