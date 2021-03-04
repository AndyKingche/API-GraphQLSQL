'use strict'
const { Sequelize } = require('sequelize')
const model = require('../db/model')
const errores = require('../lib/errors')

let id = 0
const { //aqui ubicamos las variables que se creo en el archivo donde se puso las variables de entorno
  DB_USER,
  DB_PASSWD,
  DB_HOST,
  DB_NAME,
  DB_DBMS,
  DB_PORT,
  DBsql_USER,
  DBsql_PASSWD,
  DBsql_HOST,
  DBsql_NAME,
  DBsql_DBMS,
  DBsql_PORT
  }=process.env
 let sequelize = new Sequelize(`${DB_NAME}`,`${DB_USER}`,`${DB_PASSWD}`,{
    host:`${DB_HOST}`,
    dialect:`${DB_DBMS}`,
    port:`${DB_PORT}`,
    define: {},
    dialectOptions: {
      options: {
        requestTimeout: 60000000
      }
    },
    pool: {
      max: 10,
      min: 0,
      idle: 100000,
      require:1000000
    },
    logging:false
  })

// function connectDB(){
//     console.log("id es", id)
//     try {
//        sequelize.authenticate();
//         const models={
//           usuarios: model.Usuario(sequelize),
//           comentarios:model.Comentario(sequelize),
//           categorias:model.Categoria(sequelize),
//           posts:model.Post(sequelize)
//         }
        
//         Object.keys(models).forEach(modelName => {
//           if ('associate' in models[modelName]) {
//             models[modelName].associate(models)
//           }
//         })
        
//         console.log('La conexion se ha establecido con exito');
//         models.sequelize = sequelize
//         models.Sequelize = Sequelize      
//         return models
//       } catch (error) {
          
//         console.error('Imposible conectar con la base de datos:');
//         errores(error)
//       }
// }
// function chosseDataBase(id){
//   console.log("no paso por aqui")
//     id = id
//   connectDB()
//   }
//   escogerbasedatos()
// module.exports = connectDB;
// module.exports = chosseDataBase;

module.exports={
  
  connectDB:()=>{
    try {
      
       sequelize.authenticate();
        const models={
          usuarios: model.Usuario(sequelize),
          comentarios:model.Comentario(sequelize),
          categorias:model.Categoria(sequelize),
          posts:model.Post(sequelize)
        }
        
        Object.keys(models).forEach(modelName => {
          if ('associate' in models[modelName]) {
            models[modelName].associate(models)
          }
        })
        
        console.log('La conexion se ha establecido con exito',sequelize.options.dialect);
        models.sequelize = sequelize
        models.Sequelize = Sequelize      
        return models
      } catch (error) {
          
        console.error('Imposible conectar con la base de datos:');
        errores(error)
      }
  },
  connectDBmssql:()=>{
    let sequelize2 = new Sequelize(`${DBsql_NAME}`,`${DBsql_USER}`,`${DBsql_PASSWD}`,{
      host:`${DBsql_HOST}`,
      dialect:`${DBsql_DBMS}`,
      port:`${DBsql_PORT}`,
      define: {},
      dialectOptions: {
        options: {
          requestTimeout: 60000000
        }
      },
      pool: {
        max: 10,
        min: 0,
        idle: 100000,
        require:1000000
      },
      logging:false
    })
    console.log("entre")
    try {
      
       sequelize2.authenticate();
    
        const models={
          usuarios: model.Usuario(sequelize2),
          comentarios:model.Comentario(sequelize2),
          categorias:model.Categoria(sequelize2),
          posts:model.Post(sequelize2)
        }
        Object.keys(models).forEach(modelName => {
          if ('associate' in models[modelName]) {
            models[modelName].associate(models)
          }
        })
        
        console.log('La conexion se ha establecido con exito',sequelize2.options.dialect);
        models.sequelize2 = sequelize2
        models.Sequelize = Sequelize    
        return models
      } catch (error) {
          
        console.error('Imposible conectar con la base de datos:');
        errores(error)
      }
  }
  
}