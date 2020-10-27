const express = require('express');
const router = express.Router();
const usuarios = require('../controller/usuarioController');
const {check} = require('express-validator');

router.post('/',
    [
       check('nombre', 'El nombre es obligatorio').not().isEmpty(),
       check('email', 'Agrega un email valido').isEmail(),
       check('password', 'El password debe ser del almenos 6 caracteres').isLength({min:6})
    ],
    usuarios.NuevoUsuario
)

module.exports = router;