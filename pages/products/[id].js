import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from '../../services/axios'
import RecordDetail from '../../components/recordDetail/index'

const Product = (props) => {
  const router = useRouter()
  const [productData, setProductData] = useState([])
  const id = router.query.id
  

  const loadProduct = async (id) => {
    const res = await axios.get(`/v1/products/${id}`)
    setProductData(res.data)
  }

  const saveProduct = async (product) => {
    const res = await axios.put(`/v1/products/${product.id}/edit`, product)
    setProductData(res.data.product)
  }

  useEffect(() => {
    loadProduct(id)
  }, [])

  return <RecordDetail inputData={productData} onHandleSave={saveProduct}/>
}

export default Product

export async function getServerSideProps(context) {
  return {
    props: {},
  }
}