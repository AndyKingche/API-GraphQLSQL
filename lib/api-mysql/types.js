'use strict'
//const {connectDB,chooseDatabase} = require('../../db/db')
const {mysql} = require('../../db/db')
const errores = require('../errors')
const DataLoader = require('dataloader')
const { createContext, EXPECTED_OPTIONS_KEY } = require('dataloader-sequelize')
//let db = connectDB()
let db = mysql
const context = createContext(db.sequelize);
const { Op } = db.Sequelize

module.exports = {
    Comentarios :{
        usuariosid: async( {usuariosid} ) => {
           
            let id
            //id = usuariosid !=null ? usuariosid : 0   
            // console.log("antes ",id)
            let usuarios
            try {    
                
           //const usuariosLoader = new DataLoader((id)=>{
                 
            //const usuario = db.usuarios.then(res=> res.findAll({where:{id:id}}))
            
            // db.sequelize.query("SELECT * FROM usuarios Where id=:id",{
            //     mapToModel: true, // pass true here if you have any mapped fields
            //     nest: true,
            //     replacements: { id:id }
            //   })  
              //return Promise.resolve(Array(usuario))      
          // })
           //id = usuariosid !=null ? usuariosid : 0   
            //return usuariosLoader.load(id)
        // usuarios = await new Promise((resolve,reject)=>{
        //     resolve(db.usuarios)
        // })
        // usuarios = await usuarios.findAll({
            
        //     where: {id:usuariosid}} // conditions
        //   );
         
          
        //   return usuarios

        // usuarios = await db.usuarios.then(res=>
        //     res.findAll({
        //         where: {id:usuariosid }}, // conditions
        //       )
        //       );

        usuarios = await db.usuarios.then(res=>
            res.findAll({
                where: {id:usuariosid }},{[EXPECTED_OPTIONS_KEY]: context} // conditions
              )
              );

              context.prime(usuarios)
              return usuarios
              
        //await db.usuarios.findById(usuariosid, {[EXPECTED_OPTIONS_KEY]: context});
            } catch (error) {
                console.log("Error en el resolver de los comentarios "+id)
                errores(error)
            }
        },
        postsid:async({postsid}) =>{
            let id
            try {
                const postLoader = new DataLoader((id)=>{
                    const post = db.posts.then(res=>res.findAll({where:{id:id}},{[EXPECTED_OPTIONS_KEY]: context})) 
                    
                    // db.sequelize.query("SELECT * FROM posts Where id=:id",{
                    //     mapToModel: true, // pass true here if you have any mapped fields
                    //     nest: true,
                    //     replacements: { id:id }
                    //   })
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
                    const categoria = db.categorias.then(res=> res.findAll({where:{id:id}},{[EXPECTED_OPTIONS_KEY]: context}))
                    // db.sequelize.query("SELECT * FROM categorias Where id=:id",{
                    //     mapToModel: true, // pass true here if you have any mapped fields
                    //     nest: true,
                    //     replacements: { id:id }
                    //   })
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

                    const comentario = db.comentarios.then(res => res.findAll({where:{id:id}},{[EXPECTED_OPTIONS_KEY]: context}))
                    
                    // db.sequelize.query("SELECT * FROM comentarios Where postsid=:id",{
                    //     mapToModel: true, 
                    //     nest: true,
                    //     replacements: { id:id }
                    //   })
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
             
            try {
                const usuarioLoader = new DataLoader((id)=>{
                    const usuario = db.usuarios.then(res => res.findAll({where:{id:id}},{[EXPECTED_OPTIONS_KEY]: context}))
                    // db.sequelize.query("SELECT * FROM usuarios Where id=:id",{
                    //     mapToModel: true, // pass true here if you have any mapped fields
                    //     nest: true,
                    //     replacements: { id:id }
                    //   })

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
            //let categorias
            try {
                // const categoriaLoader= new DataLoader((id)=>{
                //     const categoria = db.sequelize.query("SELECT * FROM categorias Where id=:id",{
                //         mapToModel: true, // pass true here if you have any mapped fields
                //         nest: true,
                //         replacements: { id:id }
                //       })
                //       return Promise.resolve(Array(categoria))
                // })
                
                // id = categoriasid != null ? categoriasid : 0
                //   return categoriaLoader.load(id)
               
                
                const categoriaLoader= new DataLoader((id)=>{
                    const categoria = db.categorias.then(res=>res.findAll({where:{id:id}},{[EXPECTED_OPTIONS_KEY]: context}))
                    
                    // db.sequelize.query("SELECT * FROM categorias Where id=:id",{
                    //     mapToModel: true, // pass true here if you have any mapped fields
                    //     nest: true,
                    //     replacements: { id:id }
                    //   })
                      return Promise.resolve(Array(categoria))
                })
                
                id = categoriasid != null ? categoriasid : 0
                  return categoriaLoader.load(id)           
            } catch (error) {
                console.log("Error en el resolver de Posts categorias")
            }

        },
        usuariosid: async ( {usuariosid} ) => {
           
            let id
            try {
                const usuariosLoader = new DataLoader((id)=>{
                    const usuario = db.usuarios.then(res => res.findAll({where:{id:id}},{[EXPECTED_OPTIONS_KEY]: context}))
                    // db.sequelize.query("SELECT * FROM usuarios Where id=:id",{
                    //     mapToModel: true, // pass true here if you have any mapped fields
                    //     nest: true,
                    //     replacements: { id:id }
                    //   })
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
                    const usuario = db.usuarios.then(res => res.findAll({where:{id:id}},{[EXPECTED_OPTIONS_KEY]: context}))
                    // db.sequelize.query("SELECT * FROM usuarios Where id=:id",{
                    //     mapToModel: true, // pass true here if you have any mapped fields
                    //     nest: true,
                    //     replacements: { id:id }
                    //   })
                      return Promise.resolve(Array(usuario))
                })
                id = usuariosid !=null ? usuariosid : 0   
                         console.log("est")
                return usuariosLoader.load(id)
            } catch (error) {
                console.log("Error en el resolver de los comentarios post "+id)
                errores(error)
            }
        }
    }
}