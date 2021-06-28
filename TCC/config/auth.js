const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const db = require('../models/db');
const CadastroUser = require('../models/cadastroUser');

module.exports = function (passport) {
    passport.use(new localStrategy(function (username, password, done) {
        CadastroUser.findOne({ where: {'email': username} }, function(error, User) {
            
            if (error) { return done(error); }
            
            if (!User) {
                return done(null, false, { message: 'Esta conta não Existe' });
            }

            bcrypt.compare(password, User.senha, (erro, certa) => {
                if (certa) {
                    // console.log('if certa');
                    return done(null, User);
                } else {
                    // console.log('else certa');
                    return done(null, false, { message: 'Senha Incorreta' });
                }
            });
        });
    }));

    passport.serializeUser((User, done) => {
        done(null, User.id);
    });
   
    passport.deserializeUser(function(id, done) {
        // CadastroUser.findOne({where: {'id': id}}, function(erro, User) {
        //     return done(erro, User);
        // });
            return done(erro, User);
    });    
}