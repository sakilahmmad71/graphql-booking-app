import React from 'react'
import './Booking.css'

const Booking = (props) => {
    const { title } = props.booking.event
    return (
        <div className="booking__detail">
            <h3>{title}</h3>
            <p>{new Date(props.booking.createdAt).toLocaleString()}</p>
        </div>
    )
}

export default Booking
