// Custom hook for user Authorization

import axios from '../services/axios'
import React from 'react'
import { useState, useEffect } from 'react'

export const useAuth = (props) => {
    const [accessToken, setAccessToken] = useState(null)

    const csrf = () => axios.get('http://localhost/sanctum/csrf-cookie')

    const storeToken = (token) => {
        setAccessToken(token)
        localStorage.setItem('token', token)
        return
    }

    const getToken = () => {
        const token = localStorage.getItem('token')
        if (token) {
            return token
        } else {
            return null
        }
    }

    const login = async ({ ...props }) => {
        const login_data = {
            email: props.email,
            password: props.password,
        }

        await csrf()

        await axios
            .post('/login', login_data)
            .then((res) => {
                storeToken(res.data['access_token'])
                return res
            })
            .catch((err) => {
                if (err.status === 401) {
                    alert('Invalid credentials')
                }
            })
    }

    return {
        login,
        getToken,
    }
}
