import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from '../../services/axios'
import RecordDetail from '../../components/recordDetail/index'

const Purchase = (props) => {
  const router = useRouter()
  const [purchaseData, setPurchaseData] = useState([])
  const id = router.query.id
  

  const loadPurchase = async (id) => {
    const res = await axios.get(`/v1/purchases/${id}`)
    setPurchaseData(res.data)
  }

  const savePurchase = async (purchase) => {
    const res = await axios.put(`/v1/purchases/${purchase.id}/edit`, purchase)
    setPurchaseData(res.data.purchase)
  }

  useEffect(() => {
    loadPurchase(id)
  }, [])

  return <RecordDetail inputData={purchaseData} onHandleSave={savePurchase}/>
}

export default Purchase

export async function getServerSideProps(context) {
  return {
    props: {},
  }
}