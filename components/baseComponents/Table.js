import React, { useState } from 'react'
import Link from 'next/link'
import axios from '../../services/axios'
import formatDate from '../../services/utils'
import { AiOutlineEdit } from 'react-icons/ai'

const Table = (props) => {
  const tableHeader = props.tableHeader
  const tableData = props.tableData

  // Tab buttonst if not props then true
  const tabButtons = !props.tabButtons ? props.tabButtons : true
  const tableTitle = props.tableTitle ? props.tableTitle : 'Tabulka'
  const hideNullValues = props.hideNullValues ? props.hideNullValues : false
  const tableDetailRedirect = props.tableDetailRedirect ? props.tableDetailRedirect : '/'

  const itemActionButtons = (id) => {
    return (
      <>
        <th key={id}>
          <Link href={`/${tableDetailRedirect}/[id]`} as={`/${tableDetailRedirect}/${id}`}>
            <a><AiOutlineEdit /></a>
          </Link>
        </th>
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
        // If the value is a date, format it
        if (key === 'created_at' || key === 'updated_at') {
          return <td key={key}>{formatDate(item[key])}</td>
        }

        // If key is trader, render trader.name
        if (key === 'trader') {
          return <td key={key}>{item[key]['subject_name']}</td>
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
