const connectDB = require('../db/db')
const errores = require('./errors')
const model = require('../db/model')
const { argsToArgsConfig } = require('graphql/type/definition')
const { compareStrings } = require('graphql-tools')
module.exports = {
    createUsuario: async(root,{input})=>{

        const newUsuario = Object.assign(input)
        let db
        let usuario
        let modelo
        try{
            db = await connectDB()
            modelo = await model.Usuario(db)
            usuario = await modelo.create(newUsuario)
            newUsuario.id = usuario.id
        }catch(error){
            console.log("Error al crear un nuevo Usuario")
            errores(error)
        }
        return newUsuario;

    },editUsuario: async ( root,{id,input} ) => {
        let db
        let usuario
        let modelo
        const usuarioEdit = Object.assign(input)
        
        console.log("este es el input ", id)
        try {
            db = await connectDB()
            modelo = await model.Usuario(db)
            usuario = await modelo.update(usuarioEdit,{where:{
                id: id
            }})
            input.id = usuario.id
            usuario = await modelo.findOne({where:{id:id}})
            
        } catch (error) {
            console.log("Error al editar un Usuario ")
            errores(error)
        }
        return usuario
    },deleteUsuario: async (root, {id}) =>{
        let usuario
        let usuarioEliminado
        try {
            db = await connectDB()
            modelo = await model.Usuario(db)
            usuario = await modelo.findOne({where:{id:id}}) != null ? 
            await modelo.findOne({where:{id:id}}) :  null
            if( usuario != null){
                await modelo.destroy({where:{
                    id:id
                }})
                return usuario
            }else{
                console.log("No existe el Id")
            }
            
        } catch (error) {
            console.log("Error al eliminar un Usuario")
            errores(error)
        }
    },
    createCategoria: async(root,{input}) => {
        const newCategoria = Object.assign(input)
        
        let db
        let categoria
        let modelo
        try {
            db = await connectDB()
            modelo = await model.Categoria(db)
            categoria = await modelo.create(newCategoria)
            newCategoria.id = categoria.id
        } catch (error) {
            console.log("Error al crear una nueva Categoria")
            
        }

        return newCategoria
    },editCategoria: async (root,{id,input}) => {
        let db
        let modelo
        let categoria
        const categoriaEdit = Object.assign(input)
        try {
            db = await connectDB()
            modelo = await model.Categoria(db)
            categoria = await modelo.update(categoriaEdit,{where:{
                id: id
            }}) 
            
            categoria = await modelo.findOne({where:{
                id: id
            }})
        } catch (error) {
            console.log("Error al atuclizar una categoria")
            errores(error)
        }
        return categoria
    },deleteCategoria: async(root, {id}) =>{
        let categoria
        let categoriaEliminado
        try {
            db = await connectDB()
            modelo = await model.Categoria(db)

            categoria = await modelo.findOne({where:{id:id}}) != null  ? 
            await modelo.findOne({where:{id:id}}) : null
             if(categoria!= null ){
                 await modelo.destroy({where:{id:id}})
                 return categoria
             }else{
                console.log("No existe el Id")
             }
            
        } catch (error) {
            console.log("Error al eliminar una categoria")
            errores(error)
            
        }

    },
    createEtiqueta: async(root,{input}) => {
        const newEtiqueta = Object.assign(input)

        let db
        let modelo
        let etiqueta
        try {
            db = await connectDB()
            modelo = await model.Etiqueta(db)
            etiqueta = await modelo.create(newEtiqueta)
            newEtiqueta.id = etiqueta.id
        } catch (error) {
            console.log("Error al crear un nueva Etiqueta")
            errores(error)
        }
        return newEtiqueta

    },editEtiqueta: async(root, { id, input }) => {
        let db
        let modelo
        let etiqueta
        const etiquetaEdit = Object.assign(input)
        try {
            db = await connectDB()
            modelo = await model.Etiqueta(db)
            etiqueta = await modelo.update(etiquetaEdit,{where:{
                id: id
            }})

            etiqueta = await modelo.findOne({where:{
                id: id
            }})
            
        } catch (error) {
            console.log("Error al editar una Etiqueta")
            errores(error)
        }
        return etiqueta

    },deleteEtiqueta: async (root,{id}) => {
        let etiqueta 
        try {
            db = await connectDB()
            modelo = await model.Etiqueta(db)

            etiqueta = await modelo.findOne({where:{id:id}}) != null ? 
            await modelo.findOne({where:{id:id}}) : null

            if(etiqueta != null ){
                await modelo.destroy({where:{id:id}})
                return etiqueta
            }else{
                return null
            }
            
        } catch (error) {
            console.log("Error al eliminar una etiqueta")
            errores(error)
            
        }
    },
    createComentario: async( root,{input} ) => {
        const newComentario = Object.assign(input)
        
        let db
        let modelo
        let comentario
        let usuario
        let usuarioId
        
        try {
            db =await connectDB()
            modelo = await model.Comentario(db)
            usuario = await model.Usuario(db)
            usuarioId = await usuario.findOne({where:{id:newComentario.usuariosid}}) !=null ?
            await usuario.findOne({where:{id:newComentario.usuariosid}}) : null
            if(usuarioId != null){
                comentario = await modelo.create(newComentario)
                newComentario.id = comentario.id
                console.log("entre")
                return  newComentario
            }else{
                console.log("No existe el id ", newComentario.usuariosid)
                newComentario.contenido = "No existe el id del usuario"
                return newComentario
            }
           
        } catch (error) {
            console.log("Error al crear un comentario")
            errores(error)
        }
    },editComentario: async(root,{ id, input}) => {
        let db
        let modelo
        let comentario
        let usuarioId
        let usuario
        const comentarioEdit = Object.assign(input)
        console.log("...", comentarioEdit)
        try {
            db = await connectDB()
            modelo = await model.Comentario(db)
            usuario = await model.Usuario(db)
            usuarioId = await usuario.findOne({where:{id: comentarioEdit.usuariosid}}) != null ?
            await usuario.findOne({where:{id: comentarioEdit.usuariosid}}) : null

            if(usuarioId != null){
                comentario = await modelo.update(comentarioEdit,{where:{
                    id: id
                }})
                comentario = await modelo.findOne({where:{
                    id: id
                }})
               return comentario
            }else{
                comentarioEdit.contenido = "Mensaje: No sea actualizo por que no existe el id del usuario"
                return comentarioEdit
            }
            
        } catch (error) {
            console.log("Error al editar un comentario")
            errores(error)
        }

    },deleteComentario : async () => {
        let comentario

        try {
            db = await connectDB()
            modelo = await model.Comentario(db)
            comentario = await modelo.findOne({where:{id:id}}) != null ? 
            await modelo.findOne({where:{id:id}}) : null

            if( comentario != null ){
                await modelo.destroy({where:{id:id}})
                return comentario
            }else{
                return null
            }
        } catch (error) {
            console.log("Error al eliminar un comentario")
            errores(error)
        }
        
    },
    createPost: async (root,{ input }) => {
        const newPost = Object.assign(input)

        let db
        let modelo
        let post
        try {
            db = await connectDB()
            modelo = await model.Post(db)
            post = await modelo.create(newPost)
            newPost.id = post.id
        } catch (error) {
            console.log("Error al crear un Post")
            errores(error)
            
        }
        return newPost

    },editPost: async (root, { id , input}) => {
        let db 
        let modelo 
        let post
        let usuario
        let usuarioId
        let comentario
        let comentarioId
        let categoria
        let categoriaId
        const postEdit = Object.assign(input)
         try {
             db = await connectDB()
             modelo = await model.Post(db)
             usuario = await model.Usuario(db)
             comentario = await model.Comentario(db)
             categoria = await model.Categoria(db)

             usuarioId = await usuario.findOne({where:{id:postEdit.usuariosid}}) != null ?
             await usuario.findOne({where:{id:postEdit.usuariosid}}) : null

             comentarioId = await comentario.findOne({where:{id:postEdit.comentarioid}}) != null ?
             await comentario.findOne({where:{id:postEdit.comentarioid}}) : null

             categoriaId = await categoria.findOne({where:{id:postEdit.categoriasid}}) != null ?
             await categoria.findOne({where:{id:postEdit.categoriasid}}) : null

             if(usuarioId != null && comentarioId != null && categoriaId != null ){
                post = await modelo.update(postEdit,{where:{
                    id:id
                }})
   
                post = await modelo.findOne({where:{
                    id:id
                }})
                return post
             }else{
                 postEdit.titulo = "Mensaje: "
                 return postEdit
             }
                
         } catch (error) {
             console.log("Erro al editar Post")
             errores(error)
         }


    },
    deletePost : async (root, {id}) => {
        let post
        let modelo
        try {
            db = await connectDB()
            modelo = await model.Post(db)
            post = await modelo.findOne({where:{id:id}}) != null ?
            await modelo.findOne({where:{id:id}}) : null

            if(post != null){
                await modelo.destroy({where:{id:id}})
                return post

            }else{
                return null
            }
            
        } catch (error) {
            console.log("Error al eliminar un Post")
            errores(error)
        }

    }
}