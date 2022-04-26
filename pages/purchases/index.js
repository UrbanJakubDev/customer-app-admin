import React from 'react'
import { useState, useEffect } from 'react'
import axios from '../../services/axios'
import formatDate from '../../services/utils'

const Purchases = () => {
    const [data, setData] = useState([{}])

    const getPurchases = () => {
        axios.get('v1/purchases').then((res) => {
            setData(res.data)
            console.log(res.data)
        })
    }

    useEffect(() => {
        getPurchases()
    }, [])

    return (
    <div className="align-middle">
        <h2>Nákup</h2>
            <table className="table table-hover align-middle text-center">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>ico</th>
                        <th>datum</th>
                        <th>nazev</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.ico}</td>
                            <td>{formatDate(item.created_at)}</td>
                            <td>{item.customer?.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        </div>
    )
}

export default Purchases
