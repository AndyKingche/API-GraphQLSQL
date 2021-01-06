//const connectDB = require('./db')
const { DataTypes } = require("sequelize");

module.exports ={
    Usuario: async(db) =>{
        //let db = await connectDB()
            let User = db.define("usuarios", {
                nombre: DataTypes.TEXT,
                email:  DataTypes.TEXT,
                nickname: DataTypes.TEXT,
                login: DataTypes.TEXT,
                password:DataTypes.TEXT
              },{
                timestamps: false
            })
            return User
      
        },
        Categoria: async()=>{
            let Category = db.define("categorias",{
                nombre_categoria:DataTypes.TEXT
            })
            return Category
        },
        Etiqueta:async()=>{
            let Tags = db.define("etiquetas",{
                nombre_etiqueta:DataTypes.TEXT
            })
        }

} 



