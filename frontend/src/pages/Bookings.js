import React, { useState, useEffect, useContext } from 'react'
import { authContext } from '../App'
import Booking from '../components/Booking'
import Spinner from '../components/layout/Spinner'

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
                if (resData.data.bookings) {
                    setGetBookings(resData.data.bookings)
                    setLoading(false)
                }
            })
            .catch((error) => {
                throw error
            })
    }, [])

    return (
        <>
            {loading ? (
                <div className="loading">
                    <Spinner />
                </div>
            ) : (
                <div>
                    {getBookings.map((booking) => (
                        <Booking booking={booking} key={booking._id} />
                    ))}
                </div>
            )}
        </>
    )
}

export default Bookings
