'use strict'
require('dotenv').config();

const { makeExecutableSchema } = require('graphql-tools')
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { readFile, readFileSync} = require('fs')
const { join } = require('path')
const resolvers = require('./lib/resolvers')
const cors = require('cors')
const app = express()
const port = process.env.port || 3000

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

app.listen(port, ()=>{
    console.log(`EL SERVIDOR SE ESTA EJECUTANDO EN : http://localhost:${port}/api`)
})
