const express = require('express');
const route = express.Router();
const authController = require('../controller/authController');
const {check} = require('express-validator');
const auth = require('../middleware/auth');
route.post('/',
    check('email','Verificar el correo electronico').isEmail(),
    check('password','Verifica que el password tenga al menos 6 caracteres').isLength({min:6}),
    authController.Autenticacion
);

route.get('/',
    auth,
    authController.ObtenerUsuarioAutenticado
)

module.exports=route;