import Event from '../../models/Event'
import User from '../../models/User'
import { transformEvent } from './events'
import DataLoader from 'dataloader'

const eventLoader = new DataLoader((eventIds) => {
    return events(eventIds)
})

export const userLoader = new DataLoader((userIds) => {
    return User.find({ _id: { $in: userIds } })
})

export const events = async (eventId) => {
    try {
        const events = await Event.find({ _id: { $in: eventId } })
        events.sort((a, b) => {
            return (
                eventId.indexOf(a._id.toString()) -
                eventId.indexOf(b._id.toString())
            )
        })
        return events.map((event) => transformEvent(event))
    } catch (error) {
        throw error
    }
}

export const singleEvent = async (eventId) => {
    try {
        const event = await eventLoader.load(eventId)
        return event
    } catch (error) {
        throw error
    }
}

export const user = async (userId) => {
    try {
        const user = await userLoader.load(userId.toString())
        return {
            ...user._doc,
            createdEvents: () => eventLoader.loadMany(user._doc.createdEvents),
        }
    } catch (error) {
        throw error
    }
}
