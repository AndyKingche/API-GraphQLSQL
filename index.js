'use strict'
require('dotenv').config();
const express = require('express')
const cors = require('cors');
//const sqlconexion = require('./lib/api-mssql/sqlconexion')
const mysqlconexion = require('./lib/api-mysql/mysqlconexion')
const postgresqlconexion = require('./lib/api-postgresql/postgresqlconexion')

const app = express()
const port = process.env.port || 4000

    app.use(cors())
    app.use('/api/mysql',mysqlconexion)
    //app.use('/api/mssql', sqlconexion)
    app.use('/api/pg',postgresqlconexion)
    

        app.listen(port,()=>{ 
               console.log(`EL SERVIDOR SE ESTA EJECUTANDO EN : http://localhost:${port}/api/mysql`)    
               //console.log(`EL SERVIDOR SE ESTA EJECUTANDO EN : http://localhost:${port}/api/mssql`)
               console.log(`EL SERVIDOR SE ESTA EJECUTANDO EN : http://localhost:${port}/api/pg`)
       })
      
    




