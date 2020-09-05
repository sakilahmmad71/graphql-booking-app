import React, { useState, useContext, useEffect } from 'react'
import './Events.css'
import Modal from '../components/Modal'
import Backdrop from '../components/Backdrop'
import { authContext } from '../App'
import Event from '../components/Event'
import Spinner from '../components/layout/Spinner'

const Events = () => {
    const { authState } = useContext(authContext)

    const [openModal, setOpenModal] = useState(false)
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [date, setDate] = useState('')
    const [description, setDescription] = useState('')
    const [getEvents, setGetEvents] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const requestBody = {
            query: `
                    query {
                        events {
                            _id
                            title
                            description
                            price
                            date
                            creator {
                                _id
                                email
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
            },
        })
            .then((res) => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Failed')
                }
                return res.json()
            })
            .then((resData) => {
                if (resData.data.events) {
                    setGetEvents(resData.data.events)
                    setLoading(false)
                }
            })
            .catch((error) => {
                throw error
            })
    }, [openModal])

    const cancelModalHandle = () => {
        setOpenModal(false)
    }

    const confirmModalHandle = () => {
        setOpenModal(false)

        if (
            title.trim().length === 0 ||
            price.trim().length === 0 ||
            date.trim().length === 0 ||
            description.trim().length === 0
        ) {
            return
        }

        const token = authState.token

        const requestBody = {
            query: `
                mutation {
                    createEvent(eventInput : {title : "${title}", description : "${description}", price : ${parseFloat(
                price
            )}, date : "${date}"}) {
                        _id
                        title
                        description
                        price
                        date
                        creator {
                            _id
                            email
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
            .then((resData) => {})
            .catch((error) => {
                throw error
            })

        setTitle('')
        setPrice('')
        setDate('')
        setDescription('')
    }

    return (
        <>
            <div>
                {openModal && (
                    <>
                        <Backdrop />
                        <Modal
                            title="Add Event"
                            canCancel
                            canConfirm
                            onCancel={cancelModalHandle}
                            onConfirm={confirmModalHandle}
                        >
                            <form className="form">
                                <div className="form-control">
                                    <label htmlFor="title">Title</label>
                                    <input
                                        type="text"
                                        id="title"
                                        value={title}
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                    />
                                </div>

                                <div className="form-control">
                                    <label htmlFor="price">Price</label>
                                    <input
                                        type="number"
                                        id="price"
                                        value={price}
                                        onChange={(e) =>
                                            setPrice(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="form-control">
                                    <label htmlFor="title">Date</label>
                                    <input
                                        type="datetime-local"
                                        id="date"
                                        value={date}
                                        onChange={(e) =>
                                            setDate(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="form-control">
                                    <label htmlFor="description">
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        rows="4"
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                    />
                                </div>
                            </form>
                        </Modal>
                    </>
                )}
                {authState.token && (
                    <div className="event">
                        <h4>Share your own events!</h4>
                        <button
                            className="event__button"
                            onClick={() => {
                                setOpenModal(true)
                            }}
                        >
                            Create Event
                        </button>
                    </div>
                )}

                {loading ? (
                    <div className="loading">
                        <Spinner />
                    </div>
                ) : (
                    <div className="showevents">
                        <ul>
                            {getEvents.map((event) => (
                                <Event event={event} key={event._id} />
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    )
}

export default Events
