import React, { useState, useEffect, useContext } from 'react'
import { authContext } from '../App'
import Booking from '../components/Booking'
import Spinner from '../components/layout/Spinner'
import './Bookings.css'

const Bookings = () => {
    const [getBookings, setGetBookings] = useState([])
    const [loading, setLoading] = useState(false)
    const { authState } = useContext(authContext)

    useEffect(() => {
        setLoading(true)
        const token = authState.token

        const requestBody = {
            query: `
                query {
                    bookings {
                        _id
                        createdAt
                        event {
                            _id
                            title
                            date
                            price
                        }
                    }
                }
            `,
        }

        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        })
            .then((res) => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Failed')
                }
                return res.json()
            })
            .then((resData) => {
                const bookings = resData.data.bookings
                setGetBookings(bookings)
                setLoading(false)
            })
            .catch((error) => {
                throw error
                setLoading(false)
            })
    }, [])

    const onCancelBooking = (id) => {
        setLoading(true)
        const token = authState.token

        const requestBody = {
            query: `
                    mutation {
                        cancelBooking (bookingId : "${id}") {
                            _id
                            title
                        }
                    }
                `,
        }

        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        })
            .then((res) => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Failed')
                }
                return res.json()
            })
            .then((resData) => {
                setGetBookings((prevBookings) =>
                    prevBookings.filter((booking) => booking._id !== id)
                )
                setLoading(false)
            })
            .catch((error) => {
                throw error
                setLoading(false)
            })
    }

    return (
        <>
            {loading ? (
                <div className="loading">
                    <Spinner />
                </div>
            ) : (
                <div>
                    {getBookings.map((booking) => (
                        <Booking
                            booking={booking}
                            key={booking._id}
                            onCancel={onCancelBooking}
                        />
                    ))}
                </div>
            )}
        </>
    )
}

export default Bookings
