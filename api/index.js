const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//TRABALHANDO COM ROTAS E URL
//O APP PRECISA SER O MESMO
const app = express();

app.use(cors({
    origin: true,
    credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

require('./application/controllers/index')(app);

//TESTE DE CONEXÃO
/*app.get('/', (req, res) => {
	res.send('OK');
});*/


app.listen(3000);