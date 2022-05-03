import React from 'react'
import { useState, useEffect } from 'react'
import axios from '../../services/axios'
import formatDate from '../../services/utils'
import Table from '../../components/baseComponents/Table'

const Products = () => {
    const [data, setData] = useState([{}])

    const tableHeader = {}

    const getProducts = () => {
        axios.get('v1/products').then((res) => {
            setData(res.data)
            console.log(res.data)
        })
    }

    // Looptrouhd data and item created_at and updated_at format by formatDate function from services/utils.js
    const tableDataFormatted = data.map((item) => {
        const itemFormatted = {}
        for (let key in item) {
            if (key === 'created_at' || key === 'updated_at') {
                itemFormatted[key] = formatDate(item[key])
            } else {
                itemFormatted[key] = item[key]
            }
        }
        return itemFormatted
    })

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <div className="align-middle">
            <h2>Produkt</h2>
            <Table updateTable={getProducts} tableHeader={tableHeader} tableData={tableDataFormatted} tabButtons={true} />
            {/* <table className="table table-hover align-middle text-center">
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
            </table> */}

            {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        </div>
    )
}

export default Products
