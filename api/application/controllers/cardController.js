const express = require('express');
const authMiddleware = require('../middlewares/auth')

const Cards = require('../models/card');

const router = express.Router();
router.use(authMiddleware);

/* APLICAÇÃO DO CRUD */
//CREATE
router.post('/register_card', async (req, res) => {
    try {
        const { title, type, description, content} = req.body;
        
        const card = await Cards.create({ title, type, description, content});
        return res.send({card});
    }
    catch (err) {
        return res.status(400).send({error : 'Erro na criação no card'});
    }
});

//READ (LISTAGEM)
router.get('/', async (req, res)=>{
    try {
        const cards = await Cards.find()

        return res.send({cards});
    }
    catch (err) {
        return res.status(400).send({error: 'Erro carregando cards'});
    }
});

//UPTADE
router.put('/:cardId', async (req, res) => {
    try {
        const { title, type, description, content } = req.body;
        
        const card = await Cards.findByIdAndUpdate(req.params.cardId, {
            title,
            type,
            description,
            content,
        },{new: true}); 
        
        //CARD ATUALIZADO
        return res.send({card});
        
    } 
    catch (err) {
        return res.status(400).send({error : 'Erro atualizando card'});
    }
});

//DELETE
router.delete('/:cardId', async (req, res) => {
    try {
        const card = await Cards.findByIdAndRemove(req.params.cardId);

        return res.send('Card deletado com sucesso');

    }
    catch (err) {
        return res.status(400).send({error: 'Não foi possivel deletar o card'});
    }
});

module.exports = app => app.use('/cards', router);