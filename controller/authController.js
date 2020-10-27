const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
require('dotenv').config({path: 'variables.env'});

exports.Autenticacion= async(req, res)=>{
    //revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({erroes: errores.array()});
    }

    //Buscar si el usuario esta registrado
    const {email, password} = req.body;
    const esUsuario = await Usuario.findOne({email});
    if(!esUsuario){
        return res.status(401).json({msg: 'Tienes que tener una cuenta para poder acceder'});
    }
    //Verificar el password y autenticar el usuario
    if(bcrypt.compareSync(password, esUsuario.password)){
        //Crear JWT Json Web Token
        const token = jwt.sign({
            id: esUsuario._id,
            nombre: esUsuario.nombre
        }, process.env.SECRETA,{
            expiresIn:'8h'
        });

        res.json({token});
    }
    else{
        return res.status(401).json({msg: 'Password incorrecto'});
    }

}

exports.ObtenerUsuarioAutenticado= async(req, res, next)=>{
    
    res.json({usuario: req.usuario});
    return next();
}