'use strict'
//const {connectDB,chooseDatabase} = require('../../db/db')
const {mysql} = require('../../db/db')
const errores = require('../errors')
const DataLoader = require('dataloader')
//let db = connectDB()
let db = mysql
const { Op } = db.Sequelize

module.exports = {
    Comentarios :{
        usuariosid: async( {usuariosid} ) => {
           
            let id
            //id = usuariosid !=null ? usuariosid : 0   
            // console.log("antes ",id)
            try {    
                
           const usuariosLoader = new DataLoader((id)=>{
                 
            const usuario = db.sequelize.query("SELECT * FROM usuarios Where id=:id",{
                mapToModel: true, // pass true here if you have any mapped fields
                nest: true,
                replacements: { id:id }
              })  
              return Promise.resolve(Array(usuario))      
           })
           id = usuariosid !=null ? usuariosid : 0   
            return usuariosLoader.load(id)
        // usuarios = await new Promise((resolve,reject)=>{
        //     resolve(db.usuarios)
        // })
        // usuarios = await usuarios.findAll({
            
        //     where: {id:usuariosid}} // conditions
        //   );
         
          
        //   return usuarios

            } catch (error) {
                console.log("Error en el resolver de los comentarios "+id)
                errores(error)
            }
        },
        postsid:async({postsid}) =>{
            let id
            try {
                const postLoader = new DataLoader((id)=>{
                    const post = db.sequelize.query("SELECT * FROM posts Where id=:id",{
                        mapToModel: true, // pass true here if you have any mapped fields
                        nest: true,
                        replacements: { id:id }
                      })
                      return Promise.resolve(Array(post))
                })
            id = postsid !=null ? postsid : 0   
                          
                return postLoader.load(id)
            } catch (error) {
                console.log("Error en el resolver de los comentarios "+id)
                errores(error)
            }
        }
    },
    Posts:{
        categoriasid: async ( {categoriasid} ) => {
            let id  
            try {
                const categoriasLoader = new DataLoader((id)=>{
                    const categoria = db.sequelize.query("SELECT * FROM categorias Where id=:id",{
                        mapToModel: true, // pass true here if you have any mapped fields
                        nest: true,
                        replacements: { id:id }
                      })
                      return Promise.resolve(Array(categoria))
                })
                id = categoriasid !=null ? categoriasid : 0  
                
                  return categoriasLoader.load(id)
            } catch (error) {
                console.log("Error en el resolver de Posts categorias")
            }

        },
        comentarios: async ( {id} ) =>{
            
            //let comentario
            try {
                const comentarioLoader = new DataLoader(( id )=>{

                    const comentario = db.sequelize.query("SELECT * FROM comentarios Where postsid=:id",{
                        mapToModel: true, 
                        nest: true,
                        replacements: { id:id }
                      })
                      return Promise.resolve(Array(comentario))
                    
                })
                    
                return comentarioLoader.load(id)
                
            } catch (error) {
                console.log("Error en el resolver de Posts Comentario ")
                errores(error)
            }

            
        },
        usuariosid: async ( {usuariosid} ) => {
            
            let id
            id = categoriasid !=null ? categoriasid : 0  
            try {
                const usuarioLoader = new DataLoader((id)=>{
                    const usuario = db.sequelize.query("SELECT * FROM usuarios Where id=:id",{
                        mapToModel: true, // pass true here if you have any mapped fields
                        nest: true,
                        replacements: { id:id }
                      })

                      return Promise.resolve(Array(usuario))

                })
                id = usuariosid !=null ? usuariosid : 0   
                          
                return usuarioLoader.load(id)
                
            } catch (error) {
                console.log("Error en el resolver de Posts Usuario ")
                errores(error)
            }

        }
    },
    PostsComentario:{
        categoriasid: async ( {categoriasid} ) => {
            let id  
            try {
                const categoriaLoader= new DataLoader((id)=>{
                    const categoria = db.sequelize.query("SELECT * FROM categorias Where id=:id",{
                        mapToModel: true, // pass true here if you have any mapped fields
                        nest: true,
                        replacements: { id:id }
                      })
                      return Promise.resolve(Array(categoria))
                })
                
                  return categoriaLoader.load(id)
            } catch (error) {
                console.log("Error en el resolver de Posts categorias")
            }

        },
        usuariosid: async ( {usuariosid} ) => {
           
            let id
            try {
                const usuariosLoader = new DataLoader((id)=>{
                    const usuario = db.sequelize.query("SELECT * FROM usuarios Where id=:id",{
                        mapToModel: true, // pass true here if you have any mapped fields
                        nest: true,
                        replacements: { id:id }
                      })
                      return Promise.resolve(Array(usuario))
                })
                id = usuariosid !=null ? usuariosid : 0   
                         
                return usuariosLoader.load(id)
                
            } catch (error) {
                console.log("Error en el resolver de Posts Usuario ")
                errores(error)
            }

        }
    },ComentariosPost :{
        usuariosid: async({ usuariosid }) => {
            let id
            try {
                const usuariosLoader = new DataLoader((id)=>{
                    const usuario = db.sequelize.query("SELECT * FROM usuarios Where id=:id",{
                        mapToModel: true, // pass true here if you have any mapped fields
                        nest: true,
                        replacements: { id:id }
                      })
                      return Promise.resolve(Array(usuario))
                })
                id = usuariosid !=null ? usuariosid : 0   
                         
                return usuariosLoader.load(id)
            } catch (error) {
                console.log("Error en el resolver de los comentarios "+id)
                errores(error)
            }
        }
    }
}