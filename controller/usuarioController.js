const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');
exports.NuevoUsuario = async (req, res) =>{
    try {

        const errores = validationResult(req);

        if(!errores.isEmpty()){
            return res.status(400).json({errores: errores.array()})
        }

        //extraemos el email
        const {email, password} = req.body;

        let Nuevousuario = await Usuario.findOne({email});

        if(Nuevousuario){
            return res.status(400).json({msg: 'El usuario ya existe'});
        }

        Nuevousuario =  new Usuario(req.body);

        const salt = await bcrypt.genSalt(10);
        Nuevousuario.password= await bcrypt.hash(password, salt);
        await Nuevousuario.save();
        res.json({msg: 'Usuario almacenado correctamente'});
    } catch (error) {
        console.log(error);
    }
}