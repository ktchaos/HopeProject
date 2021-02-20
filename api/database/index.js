const mongoose = require('mongoose');

//CONEXÃO COM O BANCO DE DADOS (DB = TEST)
mongoose.connect('mongodb+srv://chaosinha:c1205@chaos.fys6f.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
    useFindAndModify: false,
    useCreateIndex: true
});
mongoose.Promise = global.Promise;

module.exports = mongoose;


//mongodb+srv://chaosinha:c1205@cluster0.fys6f.mongodb.net/test?retryWrites=true&w=majority
//mongodb://localhost/noderest