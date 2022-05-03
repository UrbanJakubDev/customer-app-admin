import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from '../../services/axios'

const Customer = (props) => {
  const router = useRouter()
  const [inputData, setInputData] = useState([])
  const customerID = router.query.id
  const [isEditable, setIsEditable] = useState(false)

  const loadCustomer = async (id) => {
    const res = await axios.get(`/v1/customers/${id}`)
    setInputData(res.data)
  }

  const saveCustomer = async (id) => {
    const res = await axios.put(`/v1/customers/${id}/edit`, inputData)
    setInputData(res.data)
  }

  

  const editButton = () => {
    if (isEditable) {
      return (
        <button
          type="button"
          className="btn btn-default"
          onClick={() => {
            setIsEditable(false)
          }}
        >
          Uložit
        </button>
      )
    }
    return (
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => {
          setIsEditable(true)
        }}
      >
        Upravit
      </button>
    )
  }

  useEffect(() => {
    loadCustomer(customerID)
  }, [])

  return (
    <div className="customer detail">
      <div className="detail-header">
        <span className="title">Detail | {inputData.name}</span>
        <small className="secondary">{inputData.ico}</small>
      </div>
      <section className="detail-body">
        <form className="detail-form">
          {
            //Render input fields for each property of the customer
            Object.keys(inputData).map((item) => {
              return (
                <div className="input-group" key={item}>
                  <label>{item}</label>
                  <input
                    type="text"
                    value={inputData[item]}
                    disabled={!isEditable}
                    onChange={(e) =>
                      setInputData({
                        ...inputData,
                        [item]: e.target.value,
                      })
                    }
                  />
                </div>
              )
            })
          }
        </form>
      </section>
      <section className="detail-footer">
        <div className="btn-group">
            {editButton()}
          <button className="btn btn-default">Archivovat</button>
          <button
            className="btn btn-default"
            onClick={() => {
              router.push('/customers')
            }}
          >
            Zpět
          </button>
        </div>
      </section>
    </div>
  )
}

export default Customer

export async function getServerSideProps(context) {
  return {
    props: {},
  }
}
