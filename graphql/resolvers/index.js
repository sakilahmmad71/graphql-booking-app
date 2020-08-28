import bcrypt from 'bcryptjs'

import Event from '../../models/Event'
import User from '../../models/User'
import Booking from '../../models/Booking'

const events = async (eventId) => {
    try {
        const events = await Event.find({ _id: { $in: eventId } })
        return events.map((event) => ({
            ...event._doc,
            date: new Date(event._doc.date).toISOString(),
            creator: user.bind(this, event.creator),
        }))
    } catch (error) {
        throw error
    }
}

const user = async (userId) => {
    try {
        const user = await User.findById(userId)
        return {
            ...user._doc,
            createdEvents: events.bind(this, user._doc.createdEvents),
        }
    } catch (error) {
        throw error
    }
}

const graphQlResolvers = {
    events: async () => {
        try {
            const events = await Event.find()
            return events.map((event) => ({
                ...event._doc,
                date: new Date(event._doc.date).toISOString(),
                creator: user.bind(this, event._doc.creator),
            }))
        } catch (error) {
            throw error
        }
    },

    users: async () => {
        try {
            const users = await User.find()
            return users.map((user) => ({
                ...user._doc,
                password: null,
            }))
        } catch (error) {
            throw error
        }
    },

    bookings: async () => {
        try {
            const bookings = await Booking.find()
            return bookings.map((booking) => ({
                ...booking._doc,
                createdAt: new Date(booking._doc.createdAt).toISOString(),
                updatedAt: new Date(booking._doc.updatedAt).toISOString(),
            }))
        } catch (error) {
            throw error
        }
    },

    createEvent: async (args) => {
        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: new Date(args.eventInput.date),
            creator: '5f4938a51b9d4a17d0896e85',
        })
        let createdEvent
        try {
            const result = await event.save()
            createdEvent = {
                ...result._doc,
                date: new Date(event._doc.date).toISOString(),
                creator: user.bind(this, result._doc.creator),
            }
            const creator = await User.findById('5f4938a51b9d4a17d0896e85')
            if (!creator) {
                throw new Error('User not found.')
            }
            creator.createdEvents.push(event)
            await creator.save()
            return createdEvent
        } catch (error) {
            throw error
        }
    },

    createUser: async (args) => {
        try {
            const user = await User.findOne({ email: args.userInput.email })
            if (user) {
                throw new Error('Email exists already.')
            }
            const hashedPass = await bcrypt.hash(args.userInput.password, 12)
            const hashedUser = new User({
                email: args.userInput.email,
                password: hashedPass,
            })
            const result = await hashedUser.save()
            return { ...result._doc }
        } catch (error) {
            throw error
        }
    },

    createBooking: async (args) => {
        try {
            const fetchedEvent = await Event.findOne({ _id: args.eventId })
            const booking = new Booking({
                user: '5f4938a51b9d4a17d0896e85',
                event: fetchedEvent,
            })
            const result = await booking.save()
            return {
                ...result._doc,
                createdAt: new Date(result._doc.createdAt).toISOString(),
                updatedAt: new Date(result._doc.updatedAt).toISOString(),
            }
        } catch (error) {
            throw error
        }
    },
}

export default graphQlResolvers
