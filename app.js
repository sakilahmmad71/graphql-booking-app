import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'

import { graphqlHTTP } from 'express-graphql'

import graphQlSchemas from './graphql/schema/index'
import graphQlResolvers from './graphql/resolvers/index'
import { isAuthenticate } from './middleware/is-auth'

const app = express()

app.use(cors())

app.use(bodyParser.json())

// // CORS policies
// app.use((req, res, next) => {
//     req.setHeader('Access=Control-Allow-Origin', '*')
//     req.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
//     req.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
//     if (req.method === 'OPTIONS') {
//         return res.sendStatus(200)
//     }
//     next()
// })

app.use(isAuthenticate)

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
        app.listen(8000, () => {
            console.log('App running on port 3000 ...')
        })
    })
    .catch((error) => console.log(error))
