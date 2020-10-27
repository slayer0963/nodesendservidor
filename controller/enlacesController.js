 const Enlaces = require('../models/Enlaces');
 const shortid= require('shortid');
 const bcrypt = require('bcrypt');
 const {validationResult} = require('express-validator');


 exports.NuevoEnlace = async (req, res, next) =>{
    //revisar errores
    const errores = validationResult(req);

    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }
    //crear un objeto
    const {nombre_original, nombre} = req.body;

    const enlace = new Enlaces();
    enlace.url=shortid.generate();
    enlace.nombre=nombre;
    enlace.nombre_original= nombre_original;
    
    
    //si el usuario esta autenticado
    
    if(req.usuario){
        const {password, descargas} = req.body;
        //asiganar un numero de descargas
        if(descargas){
            enlace.descargas= descargas;
        }
        //asiganar un password
        if(password){
            const salt = await bcrypt.genSalt(10);
            enlace.password = bcrypt.hashSync(password, salt);
        }
        enlace.autor=req.usuario.id;
    }

    //guardar enlaces en la base
    try {
        await enlace.save();
        res.json({msg: `${enlace.url}`});
    } catch (error) {
        console.log(error);
        res.status(400).json({msg: 'Problemas al guardar el enlace'});
    }
 }

 exports.ObtenerTodo = async (req, res, next) =>{
     try {
         const enlaces = await Enlaces.find({}).select('url -_id');
         res.json({enlaces})
     } catch (error) {
         
     }
 }

 exports.ObtenerEnlace = async(req, res, next) =>{
     //verificar si el enlace existe
     const {url} = req.params;
     const enlace = await Enlaces.findOne({url: url})
     if(!enlace){
         res.status(404).json({msg: 'Ese enlace no existe'});
         return next();
     }

     //si existe
     res.json({archivo: enlace.nombre, password: false});

     return next();

     
 }

 exports.TienePassword = async(req, res, next) =>{
    const {url} = req.params;
    const enlace = await Enlaces.findOne({url: url})
    if(!enlace){
        res.status(404).json({msg: 'Ese enlace no existe'});
        return next();
    }
    
    if(enlace.password){
        return res.json({password: true, enlace: enlace.url})
    }

    return next();
 }

 exports.ValidarPassword = async (req, res, next)=>{
     const {password}=req.body;
     const {url} = req.params;

     const enlace = await Enlaces.findOne({url});

     if(bcrypt.compareSync(password, enlace.password)){
         //permitir descargar el archivo
         return next();
     }
     else{
         res.status(401).json({msg: 'password incorrecto'});
     }

    
    
 }