const connectDB = require('../db/db')
const errores = require('./errors')
const model = require('../db/model')
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

    }
}