import express from 'express'
import bodyParser from 'body-parser'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'

const app = express()

app.use(bodyParser.json())

const events = []

// GraphQL setup
app.use(
    '/graphql',
    graphqlHTTP({
        schema: buildSchema(`
            type Event {
                _id : ID!
                title : String!
                description : String!
                price : Float!
                date : String!
            }

            input EventInput {
                title : String!
                description : String!
                price : Float!
                date : String!
            }

            type rootQuery {
                events : [Event!]!
            }

            type rootMutation {
                createEvent (eventInput : EventInput) : Event
            }

            schema {
                query : rootQuery,
                mutation : rootMutation
            }
    `),
        rootValue: {
            events: () => {
                return events
            },
            createEvent: (args) => {
                const event = {
                    _id: Math.random().toString(),
                    title: args.eventInput.title,
                    description: args.eventInput.description,
                    price: +args.eventInput.price,
                    date: args.eventInput.date,
                }
                events.push(event)
                return event
            },
        },
        graphiql: true,
    })
)

app.listen(3000, () => {
    console.log('App running on port 3000 ...')
})
