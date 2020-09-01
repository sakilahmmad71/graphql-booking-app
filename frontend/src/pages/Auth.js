import React, { useState } from 'react'
import './Auth.css'

import authContext from '../context/authContext'

const Auth = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSignup, setIsSignup] = useState(false)

    const contextType = authContext

    console.log(contextType)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (email.trim().length === '' && password.trim().length === '') {
            return
        }

        let requestBody = {
            query: `
                mutation {
                    createUser(userInput : {email : "${email}", password : "${password}"}) {
                        _id
                        email
                    }
                }
            `,
        }

        if (isSignup) {
            requestBody = {
                query: `
                    query {
                        login(email : "${email}", password : "${password}") {
                            userId
                            token
                            tokenExpiration
                        }
                    }
                `,
            }
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
                    // console.log(res)
                }
                return res.json()
            })
            .then((data) => {
                console.log(data)
            })
            .catch((error) => {
                throw error
            })

        setEmail('')
        setPassword('')
    }

    return (
        <div className="container">
            <div className="form__container">
                <form onSubmit={handleSubmit} className="form">
                    <div className="form__email">
                        <label>Email</label>
                        <input
                            type="text"
                            placeholder="example@email.com"
                            autoComplete="off"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <br />
                    <div className="form__password">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="form__button">
                        <button type="submit">
                            {isSignup ? 'Login' : 'Signup'}
                        </button>
                    </div>
                </form>
                <div className="singup__button">
                    <button
                        onClick={() => setIsSignup((prevSignup) => !prevSignup)}
                    >
                        Switch to {isSignup ? 'Signup' : 'Login'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Auth
