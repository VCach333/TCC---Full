const express = require('express');
const router = express.Router();

const multer = require('multer');

const PostCategoria = require('../models/PostCategoria');
const CadastroUser = require('../models/cadastroUser');
const CadastroProd = require('../models/CadastroProd');
const Carrinho = require('../models/Carrinho');
const { isNullOrUndefined } = require('util');

// var storage = multer.diskStorage({
//     destination: function (req, file, callback) {
//         callback(null, 'img/');
//     },
//     filename: function (req, file, callback) {
//         callback(null, file.originalname);
//     }
// });
var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, 'public/img/produtos/');
    },
    filename: function(req, file, callback) {

        const extensao = file.originalname.split('.')[1];

        const newName = file.originalname;

        callback(null, `${newName}.${extensao}`);
    }
});

var upload = multer({storage: storage});


/* ROTAS  DE PRODUTOS */


router.get('/cadastroProd', function (req, res) {
    PostCategoria.findAll({ order: [['id', 'DESC']] }).then(function (categorias) {
        res.render('formProd', { categorias: categorias.map(categorias => categorias.toJSON()) });
    });
});

router.post('/addProd', upload.single('img'), (req, res, next) => {
    CadastroProd.findOne({ where: { 'nome': req.body.nome } }).then(function (produto) {
        if (produto) {
            req.flash('error_msg', 'Este Produto já Existe');
            res.redirect('/admin/cadastroProd');
        } else {
            if (req.body.nome.length < 3) {
                req.flash('error_msg', 'Nome muito Curto');
                res.redirect('/admin/cadastroProd');
            } else if (req.body.preco < 100) {
                req.flash('error_msg', 'Preço Inválido');
                res.redirect('/admin/cadastroProd');
            } else if (isNullOrUndefined(req.body.categoria)) {
                req.flash('error_msg', 'Escolhe uma Categoria para o seu novo Produto');
                res.redirect('/admin/cadastroProd');
            } else if(isNullOrUndefined(req.body.imgText) || req.body.imgText.length < 3) {
                req.flash('error_msg', 'Insira uma Imagem para o Produto');
                res.redirect('/admin/cadastroProd');
            }else {
                CadastroProd.create({
                    nome: req.body.nome,
                    preco: req.body.preco,
                    descricao: req.body.descricao,
                    categoria: req.body.categoria,
                    img: req.body.imgText,
                    _idUser: 1
                }).then(function () {
                    req.flash('success_msg', 'Produto Cadastrado');
                    res.redirect('/destaque');
                }).catch(function (erro) {
                    req.flash('success_msg', 'Houve um erro ao Cadastrar o Produto - ' + erro);
                    res.redirect('/destaque');
                });
            }
        }
        
    });
});

router.get('/editProd/:id', function (req, res) {
    CadastroProd.findAll({
        where: { 'id': req.params.id }
    }).then(function (produto) {
        res.render('formUpdateProd', {
            produto: produto.map(produto => produto.toJSON())
        });
    });
});

router.get('/deletarProd/:id', function (req, res) {
    CadastroProd.destroy({ where: { 'id': req.params.id } }).then(function () {
        req.flash('success_msg', 'Produto Excluído');
        res.redirect('/destaque');
    }).catch(function (erro) {
        req.flash('error_msg', 'Houve um Erro Interno');
        res.redirect('/destaque');
    });
});

router.get('/voidProdByCat/:titulo', function (req, res) {
    CadastroProd.destroy({ where: { 'categoria': req.params.titulo } }).then(function () {
        req.flash('success_msg', 'Categoria Esvaziada');
        res.redirect('/categorias');
    }).catch(function (erro) {
        req.flash('error_msg', 'Categoria não Encontrada');
        res.redirect('/categorias');
    });
});

router.post('/updateProd/:id', upload.single('img'), function (req, res) {
    if (req.body.nome.length < 3) {
        req.flash('error_msg', 'Nome muito Curto');
        res.redirect('/admin/editProd/:id');
    } else if (req.body.preco < 100) {
        req.flash('error_msg', 'Preço Inválido');
        res.redirect('/admin/editProd/:id');
    } else if (isNullOrUndefined(req.body.categoria)) {
        req.flash('error_msg', 'Escolhe uma Categoria para o seu novo Produto');
        res.redirect('/admin/editProd/:id');
    } else if(isNullOrUndefined(req.body.imgText) || req.body.imgText.length < 3) {
        req.flash('error_msg', 'Insira uma Imagem para o Produto');
        res.redirect('/admin/editProd/:id');
    } else {
        CadastroProd.update({
            nome: req.body.nome,
            preco: req.body.preco,
            descricao: req.body.descricao,
            categoria: req.body.categoria,
            img: req.body.imgText
        }, {
            where: { id: req.params.id }
        }).then(function () {
            req.flash('success_msg', 'Produto Atualizado');
            res.redirect('/destaque');
        }).catch(function (erro) {
            req.flash('error_msg', 'Houve um Eerro Interno - ' + erro);
            res.redirect('/destaque');
        });
    }
});

/* ROTAS  DE CATEGORIAS */
router.get('/cadastroCategoria', function (req, res) {
    res.render('formCat');
});

router.post('/addCat', function (req, res) {
    var categoriaExistente;
    PostCategoria.findOne({ where: { 'titulo': req.body.titulo } }).then(function (categoria) {
        if (categoria) {
            req.flash('error_msg', 'Esta Categoria já Existe');
            res.redirect('/admin/cadastroCategoria');
        } else {
            if (req.body.titulo.length < 2 || isNullOrUndefined(req.body.titulo)) {
                req.flash('error_msg', 'Título muito Curto');
                res.redirect('/admin/cadastroCategoria');
            } else if (req.body.descricao.length < 6 || isNullOrUndefined(req.body.descricao)) {
                req.flash('error_msg', 'Descrição muito Curta');
                res.redirect('/admin/cadastroCategoria');
            } else {
                PostCategoria.create({
                    titulo: req.body.titulo,
                    descricao: req.body.descricao
                }).then(() => {
                    req.flash('success_msg', 'Categoria Cadastrada!');
                    res.redirect('/categorias');
                }).catch((erro) => {
                    req.flash('error_msg', 'Houve um Erro Interno, por favor Tente de Novo - ' + erro);
                    res.redirect('/admin/cadastroCategoria');
                });
            }
        }
    });

});

router.get('/editCategoria/:id', function (req, res) {
    PostCategoria.findAll({ where: { 'id': req.params.id } }).then(function (categoria) {
        res.render('formUpdateCat', { categoria: categoria.map(categoria => categoria.toJSON()) });
    });
});

router.post('/updateCat/:id', function (req, res) {
    PostCategoria.findOne({ where: { 'titulo': req.body.titulo } }).then(function (categoria) {
        if (categoria) {
            req.flash('error_msg', 'Esta Categoria já Existe');
            res.redirect('/admin/editCategoria/' + req.params.id);
        } else {
            if (req.body.titulo.length < 2 || isNullOrUndefined(req.body.titulo)) {
                req.flash('error_msg', 'Título muito Curto');
                res.redirect('/admin/editCategoria/' + req.params.id);
            } else if (req.body.descricao.length < 6 || isNullOrUndefined(req.body.descricao)) {
                req.flash('error_msg', 'Descrição muito Curta');
                res.redirect('/admin/editCategoria/' + req.params.id);
            } else {
                PostCategoria.update({
                    titulo: req.body.titulo,
                    descricao: req.body.descricao
                }, {
                    where: { id: req.params.id }
                }).then(function () {
                    req.flash('success_msg', 'Categoria Atualizada');
                    res.redirect('/categorias');
                }).catch(function (erro) {
                    req.flash('error_msg', 'Houve um erro Interno');
                    res.redirect('/categorias');
                });
            }
        }
    });

});

router.get('/deletar/:id', function (req, res) {
    PostCategoria.destroy({ where: { 'id': req.params.id } }).then(function () {
        req.flash('success_msg', 'Categoria Excluída');
        res.redirect('/categorias');
    }).catch(function (erro) {
        req.flash('error_msg', 'Houve um Erro Interno');
        res.redirect('/categorias');
    });
});



module.exports = router;