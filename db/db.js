const { Sequelize } = require('sequelize')
const model = require('../db/model')

const errores = require('../lib/errors')
const { //aqui ubicamos las variables que se creo en el archivo donde se puso las variables de entorno
    DB_USER,
    DB_PASSWD,
    DB_HOST,
    DB_NAME,
    DB_DBMS,
    DB_PORT
    }=process.env

const sequelize = new Sequelize(`${DB_NAME}`,`${DB_USER}`,`${DB_PASSWD}`,{
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

function connectDB(){
    
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
        
        console.log('La conexion se ha establecido con exito');
        models.sequelize = sequelize
        models.Sequelize = Sequelize      
        return models
      } catch (error) {
          
        console.error('Imposible conectar con la base de datos:');
        errores(error)
      }
}
module.exports = connectDB;
