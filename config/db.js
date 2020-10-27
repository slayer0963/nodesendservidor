const mongoose = require('mongoose');

require('dotenv').config({path: 'variables.env'});

const conectarDB = async() =>{
    try {
   
        await mongoose.connect(process.env.DB_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('conectado');
    } catch (error) {
        console.log(error)
        console.log('Hubo un error')
        process.exit(1);
    }
}

module.exports = conectarDB;