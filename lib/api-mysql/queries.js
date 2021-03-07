'use strict'
//const {connectDB,connectDBmssql} = require('../../db/db')
const {mysql} = require('../../db/db')
const errores = require('../errors')
const model = require('../../db/model')
const hrtime = require ('perf_hooks').performance.now
const DataLoader = require('dataloader')
let modelo
//let db =  connectDB()
let db = mysql
const { Op } = db.Sequelize
module.exports ={
    getUsuarios:async(root,{limit, nombre}) => {
        let startTime =  hrtime (); 
        let usuarios= []
        console.log("el limite es, ", limit)
        try{
     
            // usuarios = await new Promise((resolve,reject)=>{
            //     resolve(db.usuarios)
            // })
            
            if(nombre){

                usuarios = await db.usuarios.then(res=>
                res.findAll({
                    limit: limit,
                    offset: 0,
                    where: {nombre:{[Op.like]:`%${nombre}%`} }}, // conditions
                  ));
            }else{
                usuarios = await db.usuarios.then(res=>res.findAll({
                    limit: limit,
                    offset:0,
                    where:{}
                }))
                // .findAll({
                //     limit: limit,
                //     offset: 0,
                //     where: {}
                //  }
                //   );
            }
            
                    
            let endtime = hrtime();
            console.log("numero de datos: ",limit," este es el tiempo de respuesta:", (endtime - startTime))    
        

            return usuarios
        }catch(error){
            errores(error);
            console.log("Error al realizar GetUsuarios")
        }
        
    },
    getUsuario:async(root,{id}) => {
        let usuario = []
        try{
            usuario = await  db.sequelize.query("SELECT * FROM usuarios Where id=:id",{
                mapToModel: true, // pass true here if you have any mapped fields
                nest: true,
                replacements: { id:id }
              })
            usuario = usuario != null ? usuario : []
            return usuario[0]
        }catch(error){
            console.log("error al realizar getUsuario por id")
            errores(error)
        }
    },
    getCategorias: async(root,{limit}) => {

        console.log(`${limit}`)
        let categorias=[]
        try{
            categorias = await new Promise((resolve,reject)=>{
                resolve(db.categorias)
            })
            
            categorias = await categorias.findAll({
                limit: limit,
                offset: 0,
                where: { }}, // conditions
                )
            return categorias
        }catch(error){
            console.log("Error al realizar Get Categorias")
            errores(error)
            
        }
    },
    getCategoria: async(root,{id})=>{
        let categoria

        try{
            categoria = await  db.sequelize.query("SELECT * FROM categorias Where id=:id",{
                mapToModel: true, // pass true here if you have any mapped fields
                nest: true,
                replacements: { id:id }
              })
            categoria = categoria != null ? categoria : []
            return categoria[0]
        }catch(error){
            console.log("Error al realizar Get Categoria por id")
            errores(error)
        }
    },
    getEtiquetas: async() => {
        let etiquetas = []
        try{   
            db = await connectDB()
            modelo = await model.Etiqueta(db)
            etiquetas = await modelo.findAll()
            return etiquetas
        }catch(error){
            console.log("Error al realizar Get Etiquetas")
             errores(error)
        }
    },getEtiqueta:async(root,{id}) => {
        let etiqueta
        try {
            db = await connectDB()
            modelo = await model.Etiqueta(db)
            etiqueta = await modelo.findByPk(id) != null ? await modelo.findByPk(id) : etiqueta
            return etiqueta
        } catch (error) {
            console.log("Error al realizar Get Etiqueta por id")
            errores(error)
        }
    },
    getComentarios: async(root,{limit}) => {
        let startTime =  hrtime (); 
        let comentarios = []
        try {
            // console.log("el limite",limit)
            // comentarios = await Promise.resolve(db.comentarios)
            // comentarios = comentarios.findAll({
            //     limit: limit,
            //     offset: 0,
            //     where: { }})  
            //     let endtime = hrtime();
            //     console.log("numero de datos: ",limit," este es el tiempo de respuesta:", (endtime - startTime))    
               
            // return comentarios

            comentarios = await db.comentarios.then(res => res.findAll({
                limit:limit,
                offset:0,
                where:{}
            }))
            return comentarios
        } catch (error) {
            console.log("Error al realizar el Get Comentarios")
            errores(error)
        }
    },
    getComentario: async(root, {id}) => {
        let comentario
        try {
            
            comentario = await  db.sequelize.query("SELECT * FROM comentarios Where id=:id",{
                mapToModel: true, // pass true here if you have any mapped fields
                nest: true,
                replacements: { id:id }
              })
            comentario = comentario != null ? comentario : []
            return comentario[0]
        } catch (error) {
            console.log("Error al realizar Get Comentario por id")
            errores(error)
            
        }
    },
    getPosts: async(root,{limit}) => {
        
        let startTime =  hrtime ();  
        let posts = []
        try {
            posts = await new Promise((resolve,reject)=>{
                resolve(db.posts)
            })
            
            posts = await posts.findAll({
                limit: limit,
                offset: 0,
                where: { }}, // conditions
                )
                let endtime = hrtime();
            console.log("numero de datos,", (endtime - startTime))    
            
            return posts
            
        } catch (error) {
            console.log("Error al realizar Get Posts")
            errores(error)
            
        }

    },
    getPost: async (root,{id}) => {
        let post 
        try {
            
            post = await  db.sequelize.query("SELECT * FROM posts Where id=:id",{
                mapToModel: true, // pass true here if you have any mapped fields
                nest: true,
                replacements: { id:id }
              })
            post = post != null ? post : []
            return post[0]
        } catch (error) {
            console.log("Error al realizar get Post por id")
            errores(error)
            
        }
    }
    
}