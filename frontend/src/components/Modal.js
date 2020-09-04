import React from 'react'
import './Modal.css'

const Modal = (props) => {
    return (
        <div className="modal">
            <header className="modal__header">{props.title}</header>
            <section className="modal__content">{props.children}</section>
            <section className="modal__actions">
                {props.canCancel && (
                    <button className="btn" onClick={props.onCancel}>
                        Cancel
                    </button>
                )}

                {props.canConfirm && (
                    <button
                        className="btn"
                        type="submit"
                        onClick={props.onConfirm}
                    >
                        Confirm
                    </button>
                )}

                {props.canBook && props.token && (
                    <button className="btn" onClick={props.onBook}>
                        Book
                    </button>
                )}
            </section>
        </div>
    )
}

export default Modal
