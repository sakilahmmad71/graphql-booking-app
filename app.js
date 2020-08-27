import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

import { graphqlHTTP } from 'express-graphql'

import graphQlSchemas from './graphql/schema/index'
import graphQlResolvers from './graphql/resolvers/index'

const app = express()

app.use(bodyParser.json())

app.use(
    '/graphql',
    graphqlHTTP({
        schema: graphQlSchemas,
        rootValue: graphQlResolvers,
        graphiql: true,
    })
)

const mongoDB = {
    mongoUrl: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@booking.lt27u.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    warnings: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
}

mongoose
    .connect(mongoDB.mongoUrl, mongoDB.warnings)
    .then(() => {
        console.log('MongoDB Connected successfully...')
        app.listen(3000, () => {
            console.log('App running on port 3000 ...')
        })
    })
    .catch((error) => console.log(error))
