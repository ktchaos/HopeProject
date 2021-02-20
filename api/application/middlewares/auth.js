const jwt = require('jsonwebtoken');
const authConfig = require ('../../config/auth.json');

//TRATAMENTO DE TOKEN
module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).send({error: 'Token não informado'});
    }

    //ANÁLISE DE TOKEN (FORMATO)
    const parts = authHeader.split(' ');

    if(!parts.split === 2){
        return res.status(401).send({error: 'Formato inválido'});
    }

    const [scheme, token] = parts;

    if(!/^Bearer$/i.test(scheme)){
        return res.status(401).send({error: 'Token mal formatado'});
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err)
            return res.status(401).send({ error: 'Token inválido' });

        req.userId = decoded.id;
        return next();
    })
};