import React, { useState, useEffect } from 'react'
import DetailButtons from './detailButtons'
import formatDate from '../../services/utils'

const RecordDetail = (props) => {
  const [isEditable, setIsEditable] = useState(false)
  const [formData, setFormData] = useState([])
  const inputData = props.inputData
  const onHandleSave = props.onHandleSave

  // Set FormData from props
  useEffect(() => {
    setFormData(inputData)
  }, [inputData])

  const handleEdit = (isEditable) => {
    setIsEditable(isEditable)
  }

  const handleSave = () => {
    setIsEditable(false)
    onHandleSave(formData)
  }

  return (
    <div className="detail">
      <div className="detail-header">
        <section className="detail-header-info">
          <span className="title">Detail | {formData.name}</span>
          <small className="secondary">ID: {formData.id}</small>
          <small>Poslední změna:{formatDate(formData.updated_at)}</small>
        </section>
        <section className="detail-header-buttons">
          <DetailButtons onEdit={handleEdit} onSave={handleSave} />
        </section>
      </div>
      <section className="detail-body">
        <form className="detail-form">
          {
            //Render input fields for each property of the customer
            Object.keys(formData).map((item) => {
              if (
                item === 'id' ||
                item === 'created_at' ||
                item === 'updated_at'
              ) {
                return null
              }

              return (
                <div className="input-group" key={item}>
                  <label>{item}</label>
                  <input
                    type="text"
                    value={formData[item] ? formData[item] : ''}
                    disabled={!isEditable}
                    onChange={(e) =>
                      setFormData({ ...formData, [item]: e.target.value })
                    }
                  />
                </div>
              )
            })
          }
        </form>
      </section>
    </div>
  )
}

export default RecordDetail

export async function getServerSideProps(context) {
  return {
    props: {},
  }
}
