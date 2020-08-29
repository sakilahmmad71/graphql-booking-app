import Event from '../../models/Event'
import User from '../../models/User'
import { transformEvent } from './events'

export const events = async (eventId) => {
    try {
        const events = await Event.find({ _id: { $in: eventId } })
        return events.map((event) => transformEvent(event))
    } catch (error) {
        throw error
    }
}

export const singleEvent = async (eventId) => {
    try {
        const event = await Event.findById(eventId)
        return transformEvent(event)
    } catch (error) {
        throw error
    }
}

export const user = async (userId) => {
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
