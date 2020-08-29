import { events, createEvent } from './events'
import { bookings, bookEvent, cancelBooking } from './bookings'
import { users, createUser, login } from './users'

const graphQlResolvers = {
    login,
    events,
    users,
    bookings,
    createEvent,
    createUser,
    bookEvent,
    cancelBooking,
}

export default graphQlResolvers
