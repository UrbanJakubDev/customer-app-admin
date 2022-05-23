import React, { useState } from 'react'
import Link from 'next/link'
import axios from '../../services/axios'
import formatDate from '../../services/utils'
import { AiOutlineEdit } from 'react-icons/ai'
import ToogleSwitch from '../baseComponents/Switch'

const Table = (props) => {
  const tableHeader = props.tableHeader
  const tableData = props.tableData

  // Tab buttonst if not props then true
  const tabButtons = !props.tabButtons ? props.tabButtons : true
  const tableTitle = props.tableTitle ? props.tableTitle : 'Tabulka'
  const hideNullValues = props.hideNullValues ? props.hideNullValues : false
  const tableDetailRedirect = props.tableDetailRedirect
    ? props.tableDetailRedirect
    : '/'

  const itemActionButtons = (id) => {
    return (
      <>
        <th key={id}>
          <Link
            href={`/${tableDetailRedirect}/[id]`}
            as={`/${tableDetailRedirect}/${id}`}
          >
            <a className="icon">
              <AiOutlineEdit />
            </a>
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
      tableHeaderElements.push(<th key="tab-buttons">Detail</th>)
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

        if (key === 'name') {
          return (
            <td className="align-left" key={key}>
              {item[key]}
            </td>
          )
        }

        // If key is trader, render trader.name
        if (key === 'trader') {
          return (
            <td className="align-left" key={key}>
              {item[key]['subject_name']}
            </td>
          )
        }

        if (key === 'customer') {
          return (
            <td className="align-left" key={key}>
              {item[key] === undefined ? '' : item[key]['name']}
            </td>
          )
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
    <div id={tableDetailRedirect} className="data-table-wrapper box">
      <div className="tab-header">
        <h3 className="data-table-title">{tableTitle}</h3>
        <ToogleSwitch />
      </div>
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
