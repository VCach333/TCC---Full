const express = require('express');
const router = express.Router();
// const passport = require('passport');
// require('../config/auth')(passport);
const bd = require('../models/db');
// const PostCategoria = require('../models/PostCategoria');
const CadastroUser = require('../models/cadastroUser');
// const CadastroProd = require('../models/CadastroProd');
const Carrinho = require('../models/Carrinho');
const { isNullOrUndefined } = require('util');

router.get('/cadastroUser', function (req, res) {
    res.render('formUser');
});

router.post('/addUser', function (req, res) {
    if (req.body.senha != req.body.confirmaSenha) {
        req.flash('error_msg', 'Sua Senha é diferente da Conirmação da Senha');
        res.redirect('/user/cadastroUser');
    } else if (typeof req.body.senha == undefined || typeof req.body.confirmaSenha == undefined || req.body.senha == '' || req.body.confirmaSenha == '') {
        req.flash('error_msg', 'Insira uma Senha Válida!');
        res.redirect('/user/cadastroUser');
    } else if (req.body.nome == '' || typeof req.body.nome == undefined) {
        req.flash('error_msg', 'Insira um Nome para si!');
        res.redirect('/user/cadastroUser');
    } else if (req.body.email == '' || typeof req.body.email == undefined) {
        req.flash('error_msg', 'Insira um Email para si!');
        res.redirect('/user/cadastroUser');
    } else {
        CadastroUser.findOne({ where: { 'email': req.body.email } }).then(function (usuario) {
            {usuario: usuario.map(usuario => usuario.toJSON())}
            console.log(usuario);
            if (usuario) {
                req.flash('error_msg', 'Já existe um Usuário com este email. Tente outro!');
                res.redirect('/user/cadastroUser');
            } else {
                bcrypt.genSalt(10, (erro, salt) => {
                    bcrypt.hash(req.body.senha, salt, (erro, hash) => {
                        if (erro) {
                            req.flash('error_msg', 'Algo ocorreu mal, tente novamente!');
                            res.redirect('/user/cadastroUser');
                        } else {
                            CadastroUser.create({
                                nome: req.body.nome,
                                admin: 0,
                                senha: hash,
                                email: req.body.email,
                                telefone: req.body.telefone,
                                endereco: req.body.endereco,
                            }).then(function () {
                                req.flash('success_msg', 'Cadastrado Com Sucesso!')
                                res.redirect('/perfil');
                            }).catch(function (erro) {
                                req.flash('error_msg', 'Algo ocorreu mal, tente novamente!');
                                res.redirect('/user/cadastroUser');
                            });
                        }
                    });
                });
            }
        }).catch(function (erro) {
            req.flash('error_msg', 'Algo ocorreu mal, tente novamente ..!');
            res.redirect('/cadastroUser');
        });
    }
});


module.exports = router;