const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UsuariosSchema = new Schema({
    nombre:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    
});

module.exports=mongoose.model('usuarios', UsuariosSchema);