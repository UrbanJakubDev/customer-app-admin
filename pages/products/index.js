import React from 'react'
import { useState, useEffect } from 'react'
import axios from '../../services/axios'
import formatDate from '../../services/utils'
import Table from '../../components/baseComponents/Table'
import Head from 'next/head'

const Products = () => {
  const [data, setData] = useState([{}])

  const tableHeader = {
    id: 'ID',
    created_at: 'Vytvořeno',
    updated_at: 'Aktualizováno',
    ico: 'IČO',
    year: 'Rok',
    note: 'Note',
  }

  const tableDetailRedirect = "/products"

  const getProducts = () => {
    axios.get('v1/products').then((res) => {
      setData(res.data)
      console.log(res.data)
    })
  }

  const archiveRecord = (id) => {
    console.log(id)
    }


  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div className="align-middle">
      <Head>
        <title>Energo plyn | Produkt</title>
      </Head>
      <Table
        // Callbac functions
        onUpdateTable={getProducts}
        onArchiveRecord={archiveRecord}
        // Props
        tableTitle="Produkty"
        tableHeader={tableHeader}
        tableData={data}
        tabButtons={true}
        tableDetailRedirect={tableDetailRedirect}
      />
    </div>
  )
}

export default Products
