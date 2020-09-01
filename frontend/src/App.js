import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import './App.css'

import Auth from './pages/Auth'
import Events from './pages/Events'
import Bookings from './pages/Bookings'
import Header from './components/layout/Header'

import authContext from './context/authContext'

const App = () => {
    return (
        <BrowserRouter>
            <>
                <authContext.Provider>
                    <Header />
                    <main className="main">
                        <Switch>
                            <Redirect from="/" to="/auth" exact />
                            <Route path="/auth">
                                <Auth />
                            </Route>
                            <Route path="/events">
                                <Events />
                            </Route>
                            <Route path="/bookings">
                                <Bookings />
                            </Route>
                        </Switch>
                    </main>
                </authContext.Provider>
            </>
        </BrowserRouter>
    )
}

export default App
