import React from 'react'
import { useState, useEffect } from 'react'
import axios from '../../services/axios'
import formatDate from '../../services/utils'
import Table from '../../components/baseComponents/Table'
import Head from 'next/head'

const Purchases = () => {
  const [data, setData] = useState([])

  const tableHeader = {
    id: 'ID',
    ico: 'IČO',
    name: 'Jméno',
    created_at: 'Vytvořeno',
    updated_at: 'Aktualizováno',
    is_archived: 'Archivováno',
  }

  const getPurchases = () => {
    axios.get('v1/purchases').then((res) => {
      setData(res.data)
      console.log(res.data)
    })
  }

  const archiveRecord = (id) => {
    console.log(id)
  }

  useEffect(() => {
    getPurchases()
  }, [])

  return (
    <div className="">
      <Head>
        <title>Energo plyn | Nákupy</title>
      </Head>
      <Table
        // Callbac functions
        onUpdateTable={getPurchases}
        onArchiveRecord={archiveRecord}
        // Props
        tableTitle="Nákupy"
        tableHeader={tableHeader}
        tableData={data}
        tabButtons={true}
        tableDetailRedirect="purchases"
      />
    </div>
  )
}

export default Purchases
