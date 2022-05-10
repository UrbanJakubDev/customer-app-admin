import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from '../../services/axios'
import RecordDetail from '../../components/recordDetail/index'

const Customer = (props) => {
  const router = useRouter()
  const [customerData, setCustomerData] = useState([])
  const id = router.query.id
  

  const loadCustomer = async (id) => {
    const res = await axios.get(`/v1/customers/${id}`)
    setCustomerData(res.data)
  }

  const saveCustomer = async (customer) => {
    const res = await axios.put(`/v1/customers/${customer.id}/edit`, customer)
    setCustomerData(res.data.customer)
  }

  useEffect(() => {
    loadCustomer(id)
  }, [])

  return <RecordDetail inputData={customerData} onHandleSave={saveCustomer}/>
}

export default Customer

export async function getServerSideProps(context) {
  return {
    props: {},
  }
}
