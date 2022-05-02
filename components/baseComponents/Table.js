import React, { useState } from 'react'
import Link from 'next/link'
import axios from '../../services/axios'
import formatDate from '../../services/utils'

const Table = (props) => {
    const tableHeader = props.tableHeader
    const tableData = props.tableData
    const tabButtons = props.tabButtons
    const tableTitle = props.tableTitle ? props.tableTitle : 'Tabulka'
    const hideNullValues = props.hideNullValues ? props.hideNullValues : false

    // Function to make the table header
    const makeTableHeader = () => {
        // Make new array for table header based on the keys of the tableData, if tableHeader is not defined use the keys of the tableData, if tabButtons is defined append the "Actions" column to the end of the array
        const tableHeaderArray = Object.keys(tableData[0]).map((item) => {
            return (
                <th key={item}>
                    {tableHeader[item] ? tableHeader[item] : item}
                </th>
            )
        })

        // If tabButtons is defined add "Actions" column to the end of the array
        if (tabButtons) {
            tableHeaderArray.push(<th key="actions">Akce</th>)
        }
        return tableHeaderArray
    }

    // Loop through tableData and fill null values with 0
    const tableDataFormatted = tableData.map((item) => {
        const itemFormatted = {}

        for (let key in item) {
            console.log()
            if (item[key] === null) {
                itemFormatted[key] = 0
            } else {
                itemFormatted[key] = item[key]
            }
            if (key === "created_at" || key === "updated_at") {
                itemFormatted[key] = formatDate(item[key])
            }
        }
        return itemFormatted
    })

    // TODO: Move to parent
    // Function to archive customer information
    const archiveCustomer = (customer) => {
        customer.is_archived = !customer.is_archived
        axios.put(`v1/customers/${customer.id}/edit`, customer).then((res) => {
            props.updateTable()
        })
    }

    return (
        <div className="data-table-wrapper">
            <h3>{tableTitle}</h3>
            <table className="data-table">
                <thead>
                    <tr>{makeTableHeader()}</tr>
                </thead>
                <tbody>
                    {
                        // render tableDataFormatted as table rows. Render Edit and Delete buttons if tabButtons is defined as last columns
                        tableDataFormatted.map((item, index) => {
                            const itemArray = Object.keys(item).map((key) => {
                                return <td key={key}>{item[key]}</td>
                            })
                            if (tabButtons) {
                                itemArray.push(
                                    <td key="edit">
                                        <Link
                                            href={{
                                                pathname: '/customers/[id]',
                                                query: { id: item.id },
                                            }}
                                        >
                                            <a>E</a>
                                        </Link>
                                    </td>
                                )
                                itemArray.push(
                                    <td key="delete">
                                        <span
                                            onClick={() =>
                                                archiveCustomer(item)
                                            }
                                        >
                                            X
                                        </span>
                                    </td>
                                )
                            }
                            return <tr key={index}>{itemArray}</tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table
