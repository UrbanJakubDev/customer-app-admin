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
  const [filteredCustomerPurchases, setFilteredCustomerPurchases] = useState([])
  const [purchasesSum, setPurchasesSum] = useState([])
  const [purchasesTotal, setPurchasesTotal] = useState([])
  const [dataYear, setDataYear] = useState('all')

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
    console.log(res.data)
    setCustomerProducts(res.data)
  }

  const loadCustomerPurchases = async (id) => {
    const res = await axios.get(`/v1/customers/${id}/purchases`)
    setCustomerPurchases(res.data)
    let filteredData = await filterTableByYear(res.data, dataYear)
    setFilteredCustomerPurchases(filteredData)

    let dropZeros = await dropItemsWithZeroValue(filteredData)
    let total = await getTotalPurchases(dropZeros)
    setPurchasesSum(total)
  }

  const saveCustomer = async (customer) => {
    const res = await axios.put(`/v1/customers/${customer.id}/edit`, customer)
    setCustomerData(res.data.customer)
  }

  // Filter customerPurchases by year
  const filterTableByYear = (data, year) => {
    // convert yeat to integer
    if (year === 'all') {
      return data
    } else {
      year = parseInt(year)
      return data.filter((item) => item.year === year)
    }
  }

  // For every key in the customerPurchases reduce attribute value to the sum of all values
  const getTotalPurchases = (data) => {
    // Remove keys 'created_at', 'updated_at', 'id' from data
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
      <div className="box">
        <pre>{JSON.stringify(purchasesSum, null, 2)}</pre>

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

      <RecordDetail inputData={customerData} onHandleSave={saveCustomer} />

      
        {customerProducts.length > 0 ? (
          <Table
            tableData={customerProducts}
            tableHeader={productsHeader}
            tableTitle="Produkty"
            tableDetailRedirect="products"
            tabButtons={true}
          />
        ) : (
          'No products'
        )}
        {filteredCustomerPurchases.length > 0 ? (
          <Table
            tableData={filteredCustomerPurchases}
            tableHeader={purchasesHeader}
            tableTitle="Nákupy"
            tableDetailRedirect="purchases"
            tabButtons={true}
          />
        ) : (
          'No Purchases'
        )}
    </>
  )
}

export default Customer

export async function getServerSideProps(context) {
  return {
    props: {},
  }
}
