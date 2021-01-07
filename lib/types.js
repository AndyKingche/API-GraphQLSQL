'use strict'
const connectDB = require('../db/db')
const model = require('../db/model')
const errores = require('./errors')
module.exports = {
    Comentarios :{
        usuariosid: async({ usuariosid }) => {
            console.log("esto son los ",usuariosid)
            let db
            let usuario
            let modelo
            let ids
            try {
                db = await connectDB()
                modelo = await model.Usuario(db)
                ids = usuariosid !=null ? usuariosid : 0
                usuario = ids > 0 ? await modelo.findAll({where:{id:ids}}) : []
            } catch (error) {
                console.log("Error en el resolver de los comentarios")
                errores(error)
            }
            return usuario
        }
    },
    Posts:{
        categoriasid: async ( {categoriasid} ) => {
            let db
            let categoria
            let modelo
            let ids 
            
            try {
                db = await connectDB()
                modelo = await model.Categoria(db)
                ids = categoriasid != null ? categoriasid : 0
                categoria = ids > 0 ? await modelo.findAll({where:{ id: ids }}) : []

            } catch (error) {
                console.log("Error en el resolver de Posts categorias")
            }

            return categoria
        },
        comentarioid: async ( {comentarioid} ) =>{
            let db 
            let comentario
            let modelo 
            let ids 

            try {
                db = await connectDB()
                modelo = await model.Comentario(db)
                ids = comentarioid != null ? comentarioid : 0
                comentario = ids > 0 ? await modelo.findAll({where: { id: ids }}) : []
                
            } catch (error) {
                console.log("Error en el resolver de Posts Comentario ")
                errores(error)
            }

            return comentario
        },
        usuariosid: async ( {usuariosid} ) => {
            let db 
            let usuario
            let modelo
            let ids

            try {
                db = await connectDB()
                modelo = await model.Usuario(db)
                ids = usuariosid != null ? usuariosid : 0
                usuario = ids > 0 ? await modelo.findAll({where:{ id: ids }}) : []
                
            } catch (error) {
                console.log("Error en el resolver de Posts Usuario ")
                errores(error)
            }

            return usuario

        }
    },
    PostEtiquetas: {
        idetiqueta: async ({idetiqueta}) => {
            let db
            let modelo
            let etiqueta
            let ids

            try {
                db = await connectDB()
                modelo = await model.Etiqueta(db)
                ids = idetiqueta != null ? idetiqueta : 0
                etiqueta = ids > 0 ? await modelo.findAll({where:{
                    id: ids
                }}) : []


            } catch (error) {
                console.log("Error en el resolver PostEtiquetas id etiquetas")
                errores (error)
                
            }
            return etiqueta
        },
        idpost: async({idpost}) => {
            let db
            let modelo
            let post
            let ids

            try {
                db = await connectDB()
                modelo = await model.Post(db)
                ids = idpost != null ? idpost : 0 
                post = ids > 0 ? await modelo.findAll({where:{ id: ids}}) : []

                
            } catch (error) {
                console.log("Error en el resolver Postetiquetas id post")
                errores(error)
            }
            return post
        }
    }

}