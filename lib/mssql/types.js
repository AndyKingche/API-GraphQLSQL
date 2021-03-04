'use strict'
const {connectDBmssql} = require('../../db/db')
const model = require('../../db/model')
const errores = require('../errors')
let db = connectDBmssql()

module.exports = {
    Comentarios :{
        usuariosid: async({ usuariosid }) => {
            let usuario
            let id
            try {
            id = usuariosid !=null ? usuariosid : 0   
            usuario = id > 0 ? await  db.sequelize.query("SELECT * FROM usuarios Where id=:id",{
                    mapToModel: true, // pass true here if you have any mapped fields
                    nest: true,
                    replacements: { id:id }
                  }) : Array(usuario)              
            return usuario
            } catch (error) {
                console.log("Error en el resolver de los comentarios "+id)
                errores(error)
            }
        },
        postsid:async({postsid}) =>{
            let post
            let id
            try {
            id = postsid !=null ? postsid : 0   
            post = id > 0 ? await  db.sequelize.query("SELECT * FROM posts Where id=:id",{
                    mapToModel: true, // pass true here if you have any mapped fields
                    nest: true,
                    replacements: { id:id }
                  }) : Array(post)              
                return post
            } catch (error) {
                console.log("Error en el resolver de los comentarios "+id)
                errores(error)
            }
        }
    },
    Posts:{
        categoriasid: async ( {categoriasid} ) => {
            let categoria
            let id  
            try {
                id = categoriasid !=null ? categoriasid : 0  
                categoria = id > 0 ? await  db.sequelize.query("SELECT * FROM categorias Where id=:id",{
                    mapToModel: true, // pass true here if you have any mapped fields
                    nest: true,
                    replacements: { id:id }
                  }): Array(categoria)
                  return categoria
            } catch (error) {
                console.log("Error en el resolver de Posts categorias")
            }

        },
        comentarios: async ( {id} ) =>{
            
            let comentario
            try {
                    comentario = await  db.sequelize.query("SELECT * FROM comentarios Where postsid=:id",{
                    mapToModel: true, // pass true here if you have any mapped fields
                    nest: true,
                    replacements: { id:id }
                  })
                return comentario
                
            } catch (error) {
                console.log("Error en el resolver de Posts Comentario ")
                errores(error)
            }

            
        },
        usuariosid: async ( {usuariosid} ) => {
            let usuario
            let id
            try {
            id = usuariosid !=null ? usuariosid : 0   
            usuario = id > 0 ? await  db.sequelize.query("SELECT * FROM usuarios Where id=:id",{
                    mapToModel: true, // pass true here if you have any mapped fields
                    nest: true,
                    replacements: { id:id }
                  }) : Array(usuario)              
                return usuario
                
            } catch (error) {
                console.log("Error en el resolver de Posts Usuario ")
                errores(error)
            }

        }
    },
    PostsComentario:{
        categoriasid: async ( {categoriasid} ) => {
            let categoria
            let id  
            try {
                id = categoriasid !=null ? categoriasid : 0  
                categoria = id > 0 ? await  db.sequelize.query("SELECT * FROM categorias Where id=:id",{
                    mapToModel: true, // pass true here if you have any mapped fields
                    nest: true,
                    replacements: { id:id }
                  }): Array(categoria)
                  return categoria
            } catch (error) {
                console.log("Error en el resolver de Posts categorias")
            }

        },
        usuariosid: async ( {usuariosid} ) => {
            let usuario
            let id
            try {
                id = usuariosid !=null ? usuariosid : 0   
            usuario = id > 0 ? await  db.sequelize.query("SELECT * FROM usuarios Where id=:id",{
                    mapToModel: true, // pass true here if you have any mapped fields
                    nest: true,
                    replacements: { id:id }
                  }) : Array(usuario)              
                return usuario
                
            } catch (error) {
                console.log("Error en el resolver de Posts Usuario ")
                errores(error)
            }

        }
    },ComentariosPost :{
        usuariosid: async({ usuariosid }) => {
            let usuario
            let id
            try {
              id = usuariosid !=null ? usuariosid : 0   
            usuario = id > 0 ? await  db.sequelize.query("SELECT * FROM usuarios Where id=:id",{
                    mapToModel: true, // pass true here if you have any mapped fields
                    nest: true,
                    replacements: { id:id }
                  }) : Array(usuario)              
                return usuario
            } catch (error) {
                console.log("Error en el resolver de los comentarios "+id)
                errores(error)
            }
        }
    }
}