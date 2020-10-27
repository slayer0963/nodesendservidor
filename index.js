const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');
//crear el servidor
const app = express();



//conectarDb
conectarDB();

//puerto de la app
const port = process.env.port || 4000;

//opciones de cors para peticiones de una url especifica
const opcionesCors = {
    origin: process.env.FRONTEND
}

//habilitar cors
app.use(cors(opcionesCors));

//habilitar el json
app.use(express.json());

//habilitando carpeta publica
app.use(express.static('uploads'));

//creando las rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/enlaces', require('./routes/enlaces'));
app.use('/api/archivos', require('./routes/archivos'));



//Arrancando el servidor
app.listen(port, '0.0.0.0', ()=>{
    console.log(`El servidor esta funcionando en el puerto ${port}`);
})