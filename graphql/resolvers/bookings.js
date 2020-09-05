import Event from '../../models/Event'
import Booking from '../../models/Booking'

import { dateToString } from '../../helpers/date'
import { singleEvent, user } from './merge'
import { transformEvent } from './events'

export const transformBooking = (booking) => {
    return {
        ...booking._doc,
        user: user.bind(this, booking._doc.user),
        event: singleEvent.bind(this, booking._doc.event),
        createdAt: dateToString(booking._doc.createdAt),
        updatedAt: dateToString(booking._doc.updatedAt),
    }
}

export const bookings = async (args, req) => {
    if (!req.isAuth) {
        throw new Error('Unauthenticated')
    }
    try {
        const bookings = await Booking.find({ user: req.userId })
        return bookings.map((booking) => {
            return transformBooking(booking)
        })
    } catch (error) {
        throw error
    }
}

export const bookEvent = async (args, req) => {
    if (!req.isAuth) {
        throw new Error('Unauthenticated')
    }
    try {
        const fetchedEvent = await Event.findOne({ _id: args.eventId })
        const booking = new Booking({
            user: req.userId,
            event: fetchedEvent,
        })
        const result = await booking.save()
        return transformBooking(result)
    } catch (error) {
        throw error
    }
}

export const cancelBooking = async (args, req) => {
    if (!req.isAuth) {
        throw new Error('Unauthenticated')
    }
    try {
        const booking = await Booking.findById(args.bookingId).populate('event')
        const event = transformEvent(booking.event)
        await Booking.deleteOne({ _id: args.bookingId })
        return event
    } catch (error) {
        throw error
    }
}
