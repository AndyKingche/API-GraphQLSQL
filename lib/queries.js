'use strict'
const connectDB = require('../db/db')
const errores = require('./errors')
const model = require('../db/model')

let modelo
let db
module.exports ={
    getUsuarios:async() => {

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
    getUsuario:async(root,{id}) => {
        let usuario
        try{
            db= await connectDB()
            modelo = await model.Usuario(db)
            usuario = await modelo.findByPk(id) != null ? await modelo.findByPk(id) : usuario
            // usuario = await modelo.findByPk(id)
            // if (usuario === null) {
            //     console.log('No se econtro nada :( !')
            //   } else {
            //     console.log('Si se encontro :) !')
            //     return usuario
            //   }
            return usuario
        }catch(error){
            console.log("error al realizar getUsuario por id")
            errores(error)
        }
    },
    getCategorias: async() => {
        let categorias=[]
        try{
            db = await connectDB()
            modelo = await model.Categoria(db)
            categorias = await modelo.findAll()
            return categorias
        }catch(error){
            console.log("Error al realizar Get Categorias")
            errores(error)
            
        }
    },
    getCategoria: async(root,{id})=>{
        let categoria

        try{
            db = await connectDB()
            modelo = await model.Categoria(db)
            categoria = await modelo.findByPk(id) != null ? await modelo.findByPk(id) : categoria
            return categoria
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
    getComentarios: async() => {
        let comentarios = []

        try {
            db = await connectDB()
            modelo = await model.Comentario(db)
            comentarios = await modelo.findAll()     
            return comentarios
        } catch (error) {
            console.log("Error al realizar el Get Comentarios")
            errores(error)
        }
    },
    getComentario: async(root, {id}) => {
        let comentario
        try {
            db = await connectDB()
            modelo = await model.Comentario(db)
            comentario = await modelo.findByPk(id) !=null ? await modelo.findByPk(id) : comentario
            return comentario
        } catch (error) {
            console.log("Error al realizar Get Comentario por id")
            errores(error)
            
        }
    },
    getPosts: async() => {
        let posts = []
        try {
            db = await connectDB()
            modelo = await model.Post(db)
            posts = await modelo.findAll()

            return posts
            
        } catch (error) {
            console.log("Error al realizar Get Posts")
            errores(error)
            
        }

    },
    getPost: async (root,{id}) => {
        let post 
        try {
            db = await connectDB()
            modelo = await model.Post(db)
            post = await modelo.findByPk(id) != null ? await modelo.findByPk(id)  : post
            return post
        } catch (error) {
            console.log("Error al realizar get Post por id")
            errores(error)
            
        }
    },
    getPostEtiquetas : async () => {
        let postetiquetas = []

        try {
            db = await connectDB()
            modelo = await model.PostEtiqueta(db)
            postetiquetas = await modelo.findAll({
                attributes:['idpost','idetiqueta']
            })

            return postetiquetas
        } catch (error) {
            console.log("Error al realizar get Post Etiquetas")
            errores(error)
            
        }
    }
    
}