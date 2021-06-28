const db = require('./db');

const PostCategoria = db.sequelize.define('categorias', {
    titulo: {
        type: db.Sequelize.STRING,
    },
    descricao: {
        type: db.Sequelize.TEXT,
    }
});

/*PostCategoria.sync({force: true}); /* isto deve continuar comentado*/

module.exports = PostCategoria;