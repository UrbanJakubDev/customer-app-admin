import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const UserProfile = (props) => {
    return (
        <div className="user-profile">
            <div className="user-profile-info">
                <span className="main">Jakub Urban</span>
                <span className="secondary">Technik správy dat</span>
            </div>
            <img className="user-profile-img" src="https://facit-modern.omtanke.studio/static/media/wanna2.fa4147fbe6d636956cdf.webp"></img>
        </div>
    )
}

export default UserProfile
