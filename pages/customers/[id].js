import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from '../../services/axios'

const Customer = (props) => {
    const router = useRouter()
    const [data, setData] = useState([])
    const customerID = router.query.id

    const loadCustomer = async () => {
        const res = await axios.get(`/v1/customers/${customerID}`)
        setData(res.data)
    }

    useEffect(() => {
        loadCustomer()
    }, [])



    return (
        <div>
            <h1>Customer {data.name}</h1>
            <p>{data.ico}</p>
        </div>
    )
}

export default Customer
