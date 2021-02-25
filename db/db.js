const { Sequelize } = require('sequelize')
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
    port:`${DB_PORT}`
})
let connection
async function connectDB(){
    
    try {
        await sequelize.authenticate();
        console.log('La conexion se ha establecido con exito');
      } catch (error) {
          
        console.error('Imposible conectar con la base de datos:');
        errores(error)
      }
      return sequelize
}
 module.exports = connectDB;