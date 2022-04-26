import Axios from 'axios'

const axios = Axios.create({
    baseURL: 'http://localhost/api',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'X-Requested-With': 'XMLHttpRequest',
    },
})

// Add Bearer token header to every axios requested
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Remove token from localStorage when request error is unauthorized
axios.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response.status === 401) {
            localStorage.removeItem('token')

            // Redirect to login page
            redirect('/')
            window.location.reload()

        }
        return Promise.reject(error)
    }
)

export default axios
