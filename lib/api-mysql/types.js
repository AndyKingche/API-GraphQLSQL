'use strict'
const {mysql} = require('../../db/db')
const errores = require('../errors')
const DataLoader = require('dataloader')
const { createContext, EXPECTED_OPTIONS_KEY } = require('dataloader-sequelize')
let db = mysql
const context = createContext(db.sequelize);
const { Op } = db.Sequelize

module.exports = {
    Comentarios :{
        usuariosid: async( {usuariosid} ) => {
            try {    
                usuariosid = usuariosid != null ? usuariosid : 0
             
              return await db.usuarios.then(res=>
                res.findAll({
                    where: {id:usuariosid}},{[EXPECTED_OPTIONS_KEY]: context} // conditions
                  )
                  );
              
            } catch (error) {
                console.log("Error en el resolver de los comentarios "+id)
                errores(error)
            }
        },
        postsid:async({postsid}) =>{
            try {
                postsid = postsid != null ? postsid : 0 
                return await db.posts.then(res=>res.
                    findAll({where:{id:postsid}},
                    {[EXPECTED_OPTIONS_KEY]: context})) 
            } catch (error) {
                console.log("Error en el resolver de los comentarios "+id)
                errores(error)
            }
        }
    },
    Posts:{
        categoriasid: async ( {categoriasid} ) => {
           
            categoriasid = categoriasid !=null ? categoriasid :0
            try {
                   
                  return await db.categorias.then(res=> 
                    res.findAll({
                      where:
                    {id:categoriasid}},{[EXPECTED_OPTIONS_KEY]: context}))
                    
            } catch (error) {
                console.log("Error en el resolver de Posts categorias")
            }

        },
        comentarios: async ( {id} ) =>{
            
            try {
                const comentarioLoader = new DataLoader(( id )=>{
                    return Promise.resolve(Array(db.comentarios.then(res => res.findAll({where:{postsid:id}},{[EXPECTED_OPTIONS_KEY]: context})))
                    )
                })
                
                id = id != null ? id :0
                return comentarioLoader.load(id) 
            } catch (error) {
                console.log("Error en el resolver de Posts Comentario ")
                errores(error)
            }

            
        },
        usuariosid: async ( {usuariosid} ) => {
            usuariosid = usuariosid != null ? usuariosid : 0
            try {
            
                return await db.usuarios.then(res=>
                    res.findAll({
                        where: {id:usuariosid}},{[EXPECTED_OPTIONS_KEY]: context} // conditions
                      )
                      )
            } catch (error) {
                console.log("Error en el resolver de Posts Usuario ")
                errores(error)
            }

        }
    },
    PostsComentario:{
        categoriasid: async ( {categoriasid} ) => {

            categoriasid = categoriasid!=null ? categoriasid : 0
            try {
                  return await db.categorias.then(res=>res.findAll(
                      {where:
                        {id:categoriasid}},
                        {[EXPECTED_OPTIONS_KEY]: context}))
                             
            } catch (error) {
                console.log("Error en el resolver de Posts categorias")
            }

        },
        usuariosid: async ( {usuariosid} ) => {
           
            usuariosid = usuariosid != null ? usuariosid : 0
            try {                
                return await db.usuarios.then(res=>
                    res.findAll({
                        where: {id:usuariosid}},{[EXPECTED_OPTIONS_KEY]: context} // conditions
                      )
                      );
            } catch (error) {
                console.log("Error en el resolver de Posts Usuario ")
                errores(error)
            }

        }
    },ComentariosPost :{
        usuariosid: async({ usuariosid }) => {
            usuariosid = usuariosid != null ? usuariosid : 0
            try {
                return await db.usuarios.then(res=>
                    res.findAll({
                        where: {id:usuariosid}},{[EXPECTED_OPTIONS_KEY]: context} // conditions
                      )
                      );
            } catch (error) {
                console.log("Error en el resolver de los comentarios post "+id)
                errores(error)
            }
        }
    }
}