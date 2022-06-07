import React from 'react'
import { useState, useEffect } from 'react'
import useAuth from '../../hooks/useAuth'
import axios from '../../services/axios'
import { useRouter } from 'next/router'
import Link from 'next/link'
import formatDate from '../../services/utils'
import Table from '../../components/baseComponents/Table'
import Head from 'next/head'

const Customers = () => {
  const [data, setData] = useState([])
  const router = useRouter()

  const tableHeader = {
    id: 'ID',
    ico: 'IČO',
    name: 'Jméno',
    products_count: 'Počet produktů',
    purchases_count: 'Počet nákupů',
    is_archived: 'Archivováno',
  }

  const getUsers = () => {
    axios.get('v1/customers').then((res) => {
      setData(res.data)
    })
  }

  const archiveRecord = (id) => {
    console.log(id)
  }

  useEffect(() => {
    getUsers()
  }, [])

  if (data?.length > 0) {
    return (
      <div className="">
        <Head>
          <title>Energo plyn | Zákazníci</title>
        </Head>
        <Table
          // Callbac functions
          onUpdateTable={getUsers}
          onArchiveRecord={archiveRecord}
          // Props
          tableTitle="Zákazníci"
          tableHeader={tableHeader}
          tableData={data}
          tabButtons={true}
          tableDetailRedirect="customers"
        />
      </div>
    )
  }

  return (
    <div>
      <Head>
        <title>Energo plyn | Zákazníci</title>
      </Head>

      <h1>Loading...</h1>
      <button onClick={getUsers}>Get Users</button>
    </div>
  )
}

export default Customers
