'use strict'
const queries2 = require('./queries')
const mutation = require('./mutation')
const types = require('./types')

module.exports ={
    Query: queries2,
    Mutation: mutation,
    ...types
}