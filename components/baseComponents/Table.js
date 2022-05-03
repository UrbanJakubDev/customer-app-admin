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

  const itemActionButtons = (id) => {
    return (
      <>
        <th>
          <Link href={`/customers/[id]`} as={`/customers/${id}`}>
            <a>E</a>
          </Link>
        </th>
        <th>X</th>
      </>
    )
  }

  // Function to make the table header
  const makeTableHeader = () => {
    // Create <th> elements for each header item
    const tableHeaderElements = Object.keys(tableHeader).map((key) => {
      return <th key={key}>{tableHeader[key]}</th>
    })

    if (tabButtons) {
      tableHeaderElements.push(<th key="tab-buttons">Actions</th>)
    }
    return tableHeaderElements
  }

  const makeTableData = (data) => {
    // Create table rows for each data item
    const tableDataElements = data.map((item) => {
      const tableRowElements = Object.keys(tableHeader).map((key) => {
        // If the value is null and hideNullValues is true, don't display the value
        if (hideNullValues && item[key] === null) {
          return null
        }

        // If the value is a date, format it
        if (key === 'created_at' || key === 'updated_at') {
          return <td key={key}>{formatDate(item[key])}</td>
        }

        return <td key={key}>{item[key]}</td>
      })

      if (tabButtons) {
        tableRowElements.push(itemActionButtons(item['id']))
      }

      return <tr key={item.id}>{tableRowElements}</tr>
    })
    return tableDataElements
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
      if (key === 'created_at' || key === 'updated_at') {
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
        <tbody>{makeTableData(tableDataFormatted)}</tbody>
      </table>
    </div>
  )
}

export default Table
