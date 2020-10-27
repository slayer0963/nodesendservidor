const express = require('express');
const router = express.Router();
const archivoController = require('../controller/archivoController');
const auth = require('../middleware/auth');



router.post('/', auth, archivoController.SubirArchivo);

router.get('/:archivo', archivoController.Descargar, archivoController.EliminarArchivo);

module.exports= router;