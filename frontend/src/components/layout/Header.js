import React from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css'

const Header = () => {
    return (
        <header className="nav">
            <div className="nav__logo">
                <h1>Easy-Events</h1>
            </div>
            <nav className="nav__item">
                <ul>
                    <li>
                        <NavLink to="/auth">Authenticate</NavLink>
                    </li>
                    <li>
                        <NavLink to="/events">Events</NavLink>
                    </li>
                    <li>
                        <NavLink to="/bookings">Bookings</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header
