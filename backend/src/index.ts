require('dotenv').config({ path: '.env' })
const express = require('express')
const cookieParser = require('cookie-parser')
const jsonwebtoken = require('jsonwebtoken')

const { ApolloServer } = require('apollo-server')
const { PrismaClient } = require('@prisma/client')

const typeDefs = require('./schema')
const resolvers = require('./resolvers')

const app = express()
const port = process.env.PORT
const prisma = new PrismaClient()

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers, context: { prisma } })

// The `listen` method launches a web server.
server.listen().then(({ url }: { url: string }) => {
  console.log(`🚀  Server ready at ${url}`)
})
