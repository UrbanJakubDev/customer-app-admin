import Link from 'next/link'
import React from 'react'
import Logo from './Logo'
import Nav from './Nav'
import UserProfile from './UserProfile'

const Navigation = (props) => {
    return (
        <>
            <Logo />
            <Nav />
            <UserProfile />
        </>
    )
}

export default Navigation
