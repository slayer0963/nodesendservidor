const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');
const Enlaces = require('../models/Enlaces');
exports.SubirArchivo = async (req, res, next)=>{

    const configuracionMulter = {
        limits : { fileSize: req.usuario? 1024*1024*10 : 1024*1024 },
        storage: fileStorage = multer.diskStorage({
            destination: (req, file, cb) =>{
                cb(null, __dirname+'/../uploads')
            },
            filename: (req, file, cb) =>{
                const extencion = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
                cb(null, `${shortid.generate()}${extencion}`)
            }
        })
    }
    
    const upload = multer(configuracionMulter).single('archivo');

    upload(req, res, async(error) =>{
        if(!error){
            res.json({archivo: req.file.filename})
        }
        else{
            console.log(error);
            return next();
        }
    })
    
}

exports.EliminarArchivo = async (req, res)=>{
    try {
        fs.unlinkSync(__dirname+`/../uploads/${req.archivo}`);
        console.log('eliminado');
    } catch (error) {
        console.log(error)
    }
}

exports.Descargar = async (req, res, next) =>{

    const {archivo} = req.params;
    const enlace = await Enlaces.findOne({nombre: archivo})

    const archivoDescarga = __dirname+'/../uploads/'+archivo;
    res.download(archivoDescarga);
    //si la descarga es igual 1 se tiene que borrar el archivo
    const {descargas, nombre} = enlace;
    if(descargas===1){
        console.log('solo tiene una')
        //elimnar el archivo
        req.archivo=nombre;
        //remover de la base de datos
        await Enlaces.findOneAndRemove(enlace.id);
        return next();
    }
    else{
        enlace.descargas--;
        enlace.save();
    }
}
