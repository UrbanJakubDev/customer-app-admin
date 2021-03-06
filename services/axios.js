import Axios from 'axios'

const axios = Axios.create({
    baseURL: "https://plyn.cezenergo.cz/api/",
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
        
        if (error.response === undefined) {
            localStorage.removeItem('token')
            return Promise.reject(error)
        }

        if (error.response.status === 401 || error.response.status === 403) {
            console.log(error.response)
            localStorage.removeItem('token')
            window.location.replace('/')
        }
        return Promise.reject(error)
    }
)

export default axios
