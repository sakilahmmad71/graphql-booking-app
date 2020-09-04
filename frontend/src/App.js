import React, { createContext, useReducer } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import './App.css'

import Auth from './pages/Auth'
import Events from './pages/Events'
import Bookings from './pages/Bookings'
import Header from './components/layout/Header'
import { reducer, initialState } from './context/authReducer.js'

export const authContext = createContext()

const App = () => {
    const [auth, dispatch] = useReducer(reducer, initialState)

    return (
        <BrowserRouter>
            <>
                <authContext.Provider
                    value={{ authState: auth, authDispatch: dispatch }}
                >
                    <Header />
                    <main className="main">
                        <Switch>
                            {!auth.token && (
                                <Redirect from="/" to="/auth" exact />
                            )}

                            {auth.token && (
                                <Redirect from="/" to="/events" exact />
                            )}

                            {auth.token && (
                                <Redirect from="/auth" to="/events" exact />
                            )}

                            {!auth.token && (
                                <Redirect from="/bookings" to="/auth" exact />
                            )}

                            {!auth.token && (
                                <Route path="/auth" component={Auth} />
                            )}

                            <Route path="/events" component={Events} />

                            {auth.token && (
                                <Route path="/bookings" component={Bookings} />
                            )}
                        </Switch>
                    </main>
                </authContext.Provider>
            </>
        </BrowserRouter>
    )
}

export default App
