import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css'
import { authContext } from '../../App'
import { logout } from '../../context/authReducer.js'

const Header = () => {
    const { authState, authDispatch } = useContext(authContext)

    const handleLogout = () => {
        authDispatch(logout())
    }

    return (
        <header className="nav">
            <div className="nav__logo">
                <h1>Easy-Events</h1>
            </div>
            <nav className="nav__item">
                <ul>
                    {!authState.token && (
                        <li>
                            <NavLink to="/auth">Authenticate</NavLink>
                        </li>
                    )}

                    <li>
                        <NavLink to="/events">Events</NavLink>
                    </li>

                    {authState.token && (
                        <li>
                            <NavLink to="/bookings">Bookings</NavLink>
                        </li>
                    )}

                    {authState.token && (
                        <li>
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    )
}

export default Header
