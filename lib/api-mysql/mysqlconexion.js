const { makeExecutableSchema } = require('graphql-tools')
const { graphqlHTTP } = require('express-graphql')
const resolvers = require('./resolvers')
const { readFileSync} = require('fs')
const { join } = require('path')
const typeDefs = readFileSync(
    join(
        __dirname, '../../lib','schema.graphql'),'utf-8')
const schemamysql = makeExecutableSchema({typeDefs,resolvers})
const mysqlconexion=graphqlHTTP({
    schema: schemamysql,
    rootValue:resolvers,
    graphiql:true})
    module.exports = mysqlconexion