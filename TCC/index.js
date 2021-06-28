const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const session = require('express-session');
const flash = require('connect-flash');
const bcrypt = require('bcryptjs');
const passport = require('passport');
require('./config/auth')(passport);


const app = express();

const PostCategoria = require('./models/PostCategoria');
const CadastroUser = require('./models/cadastroUser');
const CadastroProd = require('./models/CadastroProd');
const Carrinho = require('./models/Carrinho');

const admin = require('./routers/admin');  
const user = require('./routers/user');  
const { isNullOrUndefined } = require('util');


/* Configurações da Sessão e do Flash */
app.use(session({
    secret: 'algo',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

/* Configurações do Middleware */
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});


/* Configurando o BodyParser */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser({uploadDir: '...'}))
app.use(bodyParser.json());

/* Configurando Path, tratamento do Arquivos Estáticos */
app.use(express.static(path.join(__dirname, 'public')));

/* Configurando o Handlebars */
app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

/* Rotas */

// app.use('/admin', admin);

app.get('/', function (req, res) {
    res.render('home');
});

/* ROTAS DE USUÁRIOS */
app.get('/perfil', function (req, res) {
    // Carrinho.findAll().then(function (encomendas) {
    //     res.render('perfil', { encomendas: encomendas.map(encomendas => encomendas.toJSON()) });
    // });
    res.render('perfil');
});




app.get('/login', function (req, res) {
    res.render('formLogin');
});

app.post('/login', 
    passport.authenticate('local', function (req, res, next) {
        res.redirect('/perfil/' + req.user.username);
        next();
    })
);

/* ROTAS DE PRODUTOS */
app.get('/destaque', function (req, res) {
    CadastroProd.findAll({ order: [['id', 'DESC']] }).then(function (produtos) {
        res.render('destaque', { produtos: produtos.map(produtos => produtos.toJSON()) });
    });
});

app.get('/addProdCarrinho/:id', function (req, res) {
    Carrinho.create({
        idProd: req.params.id,
        idUser: 1
    }).then(function () {
        req.flash('success_msg', 'Produto Adicionado ao Carrinho');
        res.redirect('/destaque');
    }).catch(function (erro) {
        req.flash('error_msg', 'Houve um erro ao Adicionar o Produto ao Carrinho');
        res.redirect('/destaque');
    });
});

/* ROTAS CATEGORIAS */
app.get('/categorias', function (req, res) {
    PostCategoria.findAll({ order: [['id', 'DESC']] }).then(function (categorias) {
        res.render('categorias', {categorias: categorias.map(categorias => categorias.toJSON())});
    });
});

app.get('/showCategoria/:titulo', function (req, res) {
    CadastroProd.findAll({ where: {'categoria': req.params.titulo } }).then(function (produtos) {
        res.render('showCategoriaProd', { produtos: produtos.map(produtos => produtos.toJSON()) });
    });
});

/* OUTRAS ROTAS */
// app.get('/search', function (req, res) {
//     CadastroProd.findAll({where: {'nome': req.body.inSearch}}).then(function(produtos) {
//         res.render('destaque', {produtos: produtos.map(produtos => produtos.toJSON())});
//     });
// });

app.get('/sobre', function (req, res) {
    res.render('sobre');
});




app.use('/admin', admin); // Uso para Grupos de Rotas
app.use('/user', user); // Uso para Grupos de Rotas

/* Definindo a Porta do nosso Servidor */
app.listen('3000');
console.log('Servidor Rodando -- localhost:3000');