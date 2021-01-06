'use strict'
const connectDB = require('../db/db')
const errores = require('./errors')
const model = require('../db/model')
let modelo
let db
module.exports ={
    getUsuarios:async()=>{

        let usuarios= []
        try{
            db= await connectDB()
            modelo = await model.Usuario(db)
            usuarios = await modelo.findAll()
            return usuarios
        }catch(error){
            errores(error);
            console.log("Error al realizar GetUsuarios")
        }
    },
    getUsuario:async(root,{id})=>{
        let usuario
        try{
            db= await connectDB()
            modelo = await model.Usuario(db)
            usuario = await modelo.findByPk(id)
            if (usuario === null) {
                console.log('No se econtro!');
              } else {
                console.log('Si se encontro!'); // true
                
              }
            return usuario
        }catch(error){
            console.log("error al realizar Get Usuario")
            errores(error)
        }
    }
}