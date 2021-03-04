'use strict'
require('dotenv').config();
const {connectDB,connectDBmssql} = require('./db/db')
const { makeExecutableSchema } = require('graphql-tools')
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { readFile, readFileSync} = require('fs')
const { join } = require('path')
const resolvers = require('./lib/resolvers')
const resolversmmsql= require('./lib/mssql/resolversmssql')
const cors = require('cors');
const { resolveCname } = require('dns');
const app = express()
const app1 = express()
const port = process.env.port || 4000
const port1 = process.env.port || 4001

const typeDefs = readFileSync(
    join(
        __dirname, 'lib','schema.graphql'),'utf-8')
        
const schemamysql = makeExecutableSchema({typeDefs,resolvers})
const schemamssql = makeExecutableSchema({typeDefs,resolversmmsql})
app.use(cors())
app1.use(cors())
app.use('/api/mysql',graphqlHTTP({
    schema: schemamysql,
    rootValue:resolvers,
    graphiql:true
}))
app1.use('/api/mssql',graphqlHTTP({
    schema: schemamssql,
    rootValue:resolversmmsql,
    graphiql:true
}))
const models = connectDB()
const modelsql = connectDBmssql()


    app.listen(port,()=>{ 
           console.log(`EL SERVIDOR SE ESTA EJECUTANDO EN : http://localhost:${port}/api/mysql`)    
   })



    app1.listen(port1,()=>{ 
        console.log(`EL SERVIDOR SE ESTA EJECUTANDO EN : http://localhost:${port1}/api/mssql`)
    })




