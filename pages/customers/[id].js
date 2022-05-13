import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from '../../services/axios'
import RecordDetail from '../../components/recordDetail/index'
import Table from '../../components/baseComponents/table'

const Customer = (props) => {
  const router = useRouter()
  const [customerData, setCustomerData] = useState([])
  const [customerProducts, setCustomerProducts] = useState([])
  const [customerPurchases, setCustomerPurchases] = useState([])

  const id = router.query.id

  const productsHeader = {
    id: 'ID',
    year: 'Rok',
    pc: 'Product CAL',
    pq: 'Product Q',
    pm: 'Product M',
    ps: 'Product SPOT',
    pc_ratio: 'Product CAL ratio',
    pq_ratio: 'Product Q ratio',
    pm_ratio: 'Product M ratio',
    ps_ratio: 'Product SPOT ratio',
    purgastype: 'Typ nakupu zemniho plynu',
    trader: 'Trader',
    tolerance: 'Tolerance',
  }

  const purchasesHeader = {
    id: 'ID',
    year: 'Rok',
    currency: 'Currency',
    pcq: 'Product CAL množství',
    pcp: 'Product CAL cena',
    cal_pur_date: 'Pur Date',
  }

  const loadCustomer = async (id) => {
    const res = await axios.get(`/v1/customers/${id}`)
    setCustomerData(res.data)
  }

  const loadCustomerProducsts = async (id) => {
    const res = await axios.get(`/v1/customers/${id}/products`)
    setCustomerProducts(res.data)
    console.log(res.data)
  }

  const loadCustomerPurchases = async (id) => {
    const res = await axios.get(`/v1/customers/${id}/purchases`)
    setCustomerPurchases(res.data)
    console.log(res.data)
  }

  const saveCustomer = async (customer) => {
    const res = await axios.put(`/v1/customers/${customer.id}/edit`, customer)
    setCustomerData(res.data.customer)
  }

  useEffect(() => {
    loadCustomer(id)
    loadCustomerProducsts(id)
    loadCustomerPurchases(id)
  }, [])

  return (
    <>
      <RecordDetail inputData={customerData} onHandleSave={saveCustomer} />
      <Table
        tableData={customerProducts}
        tableHeader={productsHeader}
        tableTitle="Produkty"
        tableDetailRedirect="products"
        tabButtons={true}
      />
      <Table
        tableData={customerPurchases}
        tableHeader={purchasesHeader}
        tableTitle="Nákupy"
        tableDetailRedirect="purchases"
        tabButtons={true}
      />
    </>
  )
}

export default Customer

export async function getServerSideProps(context) {
  return {
    props: {},
  }
}
