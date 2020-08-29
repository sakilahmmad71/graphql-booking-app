import { buildSchema } from 'graphql'

export default buildSchema(`
            type Booking {
                _id : ID!
                event : Event!
                user : User!
                createdAt : String!
                updatedAt : String!
            }

            type User {
                _id : ID!
                email : String!
                password : String
                createdEvents : [Event!]
            }

            type Event {
                _id : ID!
                title : String!
                description : String!
                price : Float!
                date : String!
                creator : User!
            }

            input UserInput {
                email : String!
                password : String!
            }

            type AuthData {
                userId : ID!
                token : String!
                tokenExpiration : Int!
            }

            input EventInput {
                title : String!
                description : String!
                price : Float!
                date : String!
            }

            type rootQuery {
                events : [Event!]!
                users : [User!]!
                bookings : [Booking!]!
                login (email : String!, password : String!) : AuthData!
            }

            type rootMutation {
                createEvent (eventInput : EventInput) : Event
                createUser (userInput : UserInput) : User
                bookEvent (eventId : ID!) : Booking!
                cancelBooking (bookingId : ID!) : Event!
            }

            schema {
                query : rootQuery,
                mutation : rootMutation
            }
`)
