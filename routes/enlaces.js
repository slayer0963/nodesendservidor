const express= require('express');
const route = express.Router();
const enlacesController = require('../controller/enlacesController');
const archivosController = require('../controller/archivoController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');

route.post('/',
    [
        check('nombre','Sube un archivo').not().isEmpty(),
        check('nombre_original','Sube un archivo').not().isEmpty()
    ],
    auth,
    enlacesController.NuevoEnlace
)
route.get('/', enlacesController.ObtenerTodo)

route.get('/:url',enlacesController.TienePassword,enlacesController.ObtenerEnlace)

route.post('/:url', enlacesController.ValidarPassword,enlacesController.ObtenerEnlace)






module.exports = route;