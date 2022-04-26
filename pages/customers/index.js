import React from 'react'
import { useState, useEffect } from 'react'
import useAuth from '../../hooks/useAuth'
import axios from '../../services/axios'
import { useRouter } from 'next/router'
import Link from 'next/link'
import formatDate from '../../services/utils'

const Customers = () => {
    const [data, setData] = useState([])
    const router = useRouter()

    const getUsers = () => {
        axios.get('v1/customers').then((res) => {
            setData(res.data)
            console.log(res.data)
        })
    }


    useEffect(() => {
        getUsers()
    }, [])

    if (data?.length > 0) {
        return (
            <div className="">
                <h3>Customers</h3>
                <table className="table table-hover align-middle text-center">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Datum záznamu</th>
                            <th>ICO</th>
                            <th>Jmeno</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{formatDate(item.created_at)}</td>
                                <td>{item.ico}</td>
                                <td>{item.name}</td>
                                <td>
                                    <Link
                                        href={{
                                            pathname: '/customers/[id]',
                                            query: { id: item.id},
                                          }}
                                    >
                                        <a>E</a>
                                    </Link>
                                </td>
                                <td>
                                    <span>X</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }

    return (
        <div>
            <h1>Loading...</h1>
            <button onClick={getUsers}>Get Users</button>
        </div>
    )
}

export default Customers
