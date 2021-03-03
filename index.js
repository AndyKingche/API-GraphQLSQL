'use strict'
require('dotenv').config();

const connectDB = require('./db/db')
const { makeExecutableSchema } = require('graphql-tools')
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { readFile, readFileSync} = require('fs')
const { join } = require('path')
const resolvers = require('./lib/resolvers')
const cors = require('cors');
const { resolveCname } = require('dns');
const app = express()
const port = process.env.port || 4000
const typeDefs = readFileSync(
    join(
        __dirname, 'lib','schema.graphql'),'utf-8')

        
const schema = makeExecutableSchema({typeDefs,resolvers})

app.use(cors())
app.use('/api',graphqlHTTP({
    schema: schema,
    rootValue:resolvers,
    graphiql:true
}))
const models = connectDB()

models.sequelize.sync().then(()=>{
    app.listen(port, ()=>{
        console.log(`EL SERVIDOR SE ESTA EJECUTANDO EN : http://localhost:${port}/api`)
    })

})
