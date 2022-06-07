import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from '../../services/axios'
import RecordDetail from '../../components/recordDetail/index'
import Table from '../../components/baseComponents/Table'
import Link from 'next/link'
import ICustomer from '../../interfaces/interfaces'



const Customer = () => {
  const router = useRouter()
  const id = router.query.id

  // Data for change year
  const [dataYear, setDataYear] = useState('all')

  // Raw data from the API
  const [customerData, setCustomerData] = useState([])
  const [customerProducts, setCustomerProducts] = useState([])
  const [customerPurchases, setCustomerPurchases] = useState([])

  // Filtered data for the table
  const [filteredCustomerPurchases, setFilteredCustomerPurchases] = useState([])

  // Filtered data for widget
  const [purchasesSum, setPurchasesSum] = useState([])
  const [purchasesTotal, setPurchasesTotal] = useState([])

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

  // Fetch data from server API

  // Fetch customer from API server
  const loadCustomer = async (id) => {
    await axios.get(`/v1/customers/${id}`).then((res) => {
      setCustomerData(res.data)
    })
  }

  // Fetch customer products from API server
  const loadCustomerProducsts = async (id) => {
    await axios.get(`/v1/customers/${id}/products`).then((res) => {
      setCustomerProducts(res.data)
    })
  }

  // Fetch customer purchases from API server
  const loadCustomerPurchases = async (id) => {
    const res = await axios.get(`/v1/customers/${id}/purchases`)
    setCustomerPurchases(res.data)

    let filteredData = await filterTableByYear(res.data, dataYear)
    setFilteredCustomerPurchases(filteredData)

    let dropZeros = await dropItemsWithZeroValue(filteredData)
    let total = await getTotalPurchases(dropZeros)
    setPurchasesSum(total)
  }

  // Update customer data
  const saveCustomer = async (customer) => {
    await axios
      .put(`/v1/customers/${customer.id}/edit`, customer)
      .then((res) => {
        setCustomerData(res.data.customer)
      })
  }



  // Filter customerPurchases by year
  const filterTableByYear = (data, year) => {
    if (year !== 'all') {
      return data.filter((item) => item.year === parseInt(year))
    }
    return data
  }

  // Remove unnecessary keys from RAW data
  const removeNoDataItems = (data) => {
    let filteredData = data.map((purchase) => {
      let newPurchase = {}
      for (let key in purchase) {
        // If key is not in the list of keys to remove, add it to the new object
        let remove_items = [
          'created_at',
          'updated_at',
          'id',
          'ico',
          'year',
          'currency',
          'customer_id',
          'is_archived',
          'note',
        ]

        if (!remove_items.includes(key) && !key.includes('_date')) {
          newPurchase[key] = purchase[key]
        }
      }
      return newPurchase
    })
    return filteredData
  }

  // Sum all columns in table
  const getTotalData = (data) => {
    return data.reduce(
      (r, o) => (
        Object.entries(o).forEach(([k, v]) => (r[k] = (r[k] || 0) + v)), r
      ),
      {}
    )
  }

  // For every key in the customerPurchases reduce attribute value to the sum of all values
  const getTotalPurchases = (data) => {
    // Remove keys 'created_at', 'updated_at', 'id' from data
    let filteredData = removeNoDataItems(data)

    return filteredData.reduce(
      (r, o) => (
        Object.entries(o).forEach(([k, v]) => (r[k] = (r[k] || 0) + v)), r
      ),
      {}
    )
  }

  // create new object from purchaseData with only attribute value is greater than 0
  const dropItemsWithZeroValue = (data) => {
    let filteredData = data.map((purchase) => {
      let newPurchase = {}
      for (let item in purchase) {
        if (purchase[item] > 0) {
          newPurchase[item] = purchase[item]
        }
      }
      return newPurchase
    })

    return filteredData
  }

  // Refresh components
  const refresh = async (data) => {
    let dropZeros = await dropItemsWithZeroValue(data)
    let total = await getTotalPurchases(dropZeros)
    setPurchasesSum(total)
  }

  // Hanlde year change
  const handleYearChange = async (e) => {
    let year = e.target.value

    let filteredData = await filterTableByYear(customerPurchases, year)
    setDataYear(year)
    setFilteredCustomerPurchases(filteredData)

    refresh(filteredData)
  }



  useEffect(() => {
    loadCustomer(id)
    loadCustomerProducsts(id)
    loadCustomerPurchases(id)
    
  }, [])


  return (
    <>
      <RecordDetail inputData={customerData} onHandleSave={saveCustomer} />

      <div className="box">
        <div>
          <select
            className="custom-select"
            onChange={(e) => handleYearChange(e)}
          >
            <option value="all">All</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
          </select>
        </div>
      </div>

      {customerProducts.length > 0 ? (
        <Table
          tableData={customerProducts}
          tableHeader={productsHeader}
          tableTitle="Produkty"
          tableDetailRedirect="products"
          tabButtons={true}
        />
      ) : null}
      {filteredCustomerPurchases.length > 0 ? (
        <Table
          tableData={filteredCustomerPurchases}
          tableHeader={purchasesHeader}
          tableTitle="Nákupy"
          tableDetailRedirect="purchases"
          tabButtons={true}
        />
      ) : null}
    </>
  )
}

export default Customer

export async function getServerSideProps(context) {
  return {
    props: {},
  }
}
