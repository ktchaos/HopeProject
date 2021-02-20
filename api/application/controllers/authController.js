const express = require('express');
const bcrypt = require('bcryptjs');
//const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const authConfig = require('../../config/auth');
const mailer = require('../../modules/mailer');

const router = express.Router();

//TOKEN JWT
function generateToken(params={}){
    return jwt.sign(params, authConfig.secret, 
        {expiresIn: 86400 });
}

//CADASTRO:
router.post('/register', async(req, res) => {
    const {email} = req.body;

    try{
        if(await User.findOne({email})){
            return res.status(400).send({error: 'Usuário já existe'});
        }
        
        const user = await User.create(req.body); // CRIA UM USUÁRIO DE ACORDO COM A REQUISIÇÃO
        user.password = undefined;

        return res.send(
            { user, token: generateToken({ id: user.id }) }
        );
    }
    catch(err){
        console.log(err);
        return res.status(400).send({error: 'Não foi possível criar o usuário!'});
    }
});

//AUTENTICAÇÃO:
router.post('/authenticate', async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email}).select('+password');

        if(!user){
            return res.status(400).send({error: 'Usuário não encontrado'});
        }

        if(!await bcrypt.compare(password, user.password)){
            return res.status(400).send({error: 'Senha incorreta'});
        }

        user.password = undefined;

        res.send({
            user, 
            token: generateToken({ id: user.id }),
        });
    }
    catch(err){
        console.log(err);
        return res.status(400).send({error: 'Não foi possível logar!'});
    }   
    
});

//ESQUECI MINHA SENHA:
router.post('/forgot_password', async (req, res) => {
    const {email} = req.body;

    try{
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).send({error: 'Usuário não encontrado'}); 
        }

        //TOKEN ALEATÓRIO QUE EXPIRA EM 1 HORA
        //const token = crypto.randomBytes(20).toString('hex');
        let token = ("" + Math.random()).substring(2,6);
        const now = new Date();
        now.setHours(now.getHours()+1);

        await User.findByIdAndUpdate(user.id, {
            '$set': {
                passwordResetToken: token,
                passwordResetExpires: now,
            }
        });

        mailer.sendMail({
            to: email,
            from:'marialacerda@cc.ci.ufpb.br',
            template:'auth/forgot_password',
            context: { token }
        }, (err) => {
            if(err){
                console.log(err);
                return res.status(400).send({error: 'Falha ao enviar e-mail, tente novamente!'});
            }
            //FOI PRO MAIL TRAP
            return res.send();
        })

    }
    catch(err){
        console.log(err);
        res.status(400).send({error: 'Tente novamente'});
    }
});

//RESETAR A SENHA:
router.post('/reset_password', async (req, res) => {
    const {email, token, password} = req.body;

    try{
        const user = await User.findOne({email}).select('+passwordResetToken passwordResetExpires');

        if(!user){
            return res.status(400).send({error: 'Usuário não existe'});
        }
        
        if(token !== user.passwordResetToken){
            return res.status(400).send({error: "Token inválido"});
        }
            
        const now = new Date();
        if( now > user.passwordResetExpires){
            return res.status(400).send({error: 'Esse Token expirou, tente novamente'});
        }
        
        //se deu certo:
        user.password = password;

        await user.save();
        res.send();
    }
    catch(err){
        return res.status(400).send({error: 'Não foi possível mudar a senha, tente novamente'});
    }
});

//RECEBER ADM:

//REPASSSA A ROTA /AUTH/REGISTER QUE CHAMA A FUNÇÃO DE REGISTRO (passa a rota com o prefixo auth)
module.exports = app => app.use('/auth', router);