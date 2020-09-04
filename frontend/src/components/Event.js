import React, { useContext, useState } from 'react'
import './Event.css'
import { authContext } from '../App'
import Modal from './Modal'
import Backdrop from './Backdrop'

const Event = (props) => {
    const { authState } = useContext(authContext)
    const [openModal, setOpenModal] = useState(false)
    const { _id, title, description, price, date, creator } = props.event

    const onOpenDetails = () => {
        setOpenModal(true)
    }

    const cancelModalHandle = () => {
        setOpenModal(false)
    }

    const onBooking = () => {
        const token = authState.token

        const requestBody = {
            query: `
                mutation {
                    bookEvent(eventId : "${_id}") {
                        _id
                        createdAt
                        updatedAt
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
                console.log(resData)
            })
            .catch((error) => {
                throw error
            })

        setOpenModal(false)
    }

    return (
        <li className="showevents__lists">
            <div className="showevents__card">
                <div>
                    <h2>{title}</h2>
                    <h4>
                        ${price} - {new Date(date).toLocaleString()}
                    </h4>
                </div>

                {openModal && (
                    <>
                        <Backdrop />
                        <Modal
                            title={title}
                            canCancel
                            canBook
                            onCancel={cancelModalHandle}
                            onBook={onBooking}
                            token={authState.token}
                        >
                            <div className="event__details">
                                <h2>{title}</h2>
                                <h3>Price : ${price}</h3>
                                <h4>
                                    Date : {new Date(date).toLocaleString()}
                                </h4>
                                <p>{description}</p>
                            </div>
                        </Modal>
                    </>
                )}

                <div className="showevents__info">
                    {creator._id === authState.userId ? (
                        <p>You are owner of the event</p>
                    ) : (
                        <button className="btn" onClick={onOpenDetails}>
                            View Details
                        </button>
                    )}
                </div>
            </div>
        </li>
    )
}

export default Event
