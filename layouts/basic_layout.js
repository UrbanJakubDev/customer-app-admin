import React, { useState, useEffect } from 'react'
import Navigation from '../components/navigation'
import Login from '../pages/login'
import { useRouter } from 'next/router'
import { redirect } from 'next/dist/server/api-utils'
import { useAuth } from '../hooks/useAuth'
import Head from 'next/head'

const Layout = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const { getToken } = useAuth()

    // callback function for authentication
    const handleLoginSubmit = () => {
        setIsLoggedIn(true)
    }

    const handleLogout = () => {
        setIsLoggedIn(false)
    }

    // Check if user is logged in
    useEffect(() => {
        const token = getToken()
        if (token) {
            setIsLoggedIn(true)
        }
    }, [])

    if (!isLoggedIn) {
        return (
            <div className="">
                <Login onLoginSubmit={handleLoginSubmit} />
            </div>
        )
    }

    return (
        <div className="page-container">
            <Head>
                <title>Page Titiel</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                ></meta>
            </Head>
            <header className="box">
                <Navigation />
            </header>
            <main className="box">{props.children}</main>
            <footer className="box">
                <a href="#" onClick={handleLogout}>
                    Logout
                </a>
            </footer>
        </div>
    )
}

export default Layout
