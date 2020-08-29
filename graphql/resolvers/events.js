import Event from '../../models/Event'
import User from '../../models/User'

import { dateToString } from '../../helpers/date'
import { user } from './merge'

export const transformEvent = (event) => {
    return {
        ...event._doc,
        date: dateToString(event._doc.date),
        creator: user.bind(this, event.creator),
    }
}

export const events = async () => {
    try {
        const events = await Event.find()
        return events.map((event) => {
            return transformEvent(event)
        })
    } catch (error) {
        throw error
    }
}

export const createEvent = async (args, req) => {
    if (!req.isAuth) {
        throw new Error('Unauthenticated')
    }
    const event = new Event({
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: +args.eventInput.price,
        date: new Date(args.eventInput.date),
        creator: req.userId,
    })
    let createdEvent
    try {
        const result = await event.save()
        createdEvent = transformEvent(result)
        const creator = await User.findById(req.userId)
        if (!creator) {
            throw new Error('User not found.')
        }
        creator.createdEvents.push(event)
        await creator.save()
        return createdEvent
    } catch (error) {
        throw error
    }
}
