import React, { useState, useEffect } from 'react'
import DetailButtons from './detailButtons'
import {formatDate} from '../../services/utils'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import {filterDataArray} from '../../services/utils'

// Typecsript props
// interface Props {
//     inputData: []
//     onHandleSave: () => void;
// }

const RecordDetail = (props) => {

  const { register, handleSubmit } = useForm()
  const [isEditable, setIsEditable] = useState(false)
  const [formData, setFormData] = useState([])
  const [detailData, setDetailData] = useState([])
  const inputData = props.inputData
  const onHandleSave = props.onHandleSave

   // If key is not in the list of keys to remove, add it to the new object
   let keep_items = [
     'id',
    'ico',
    'name',
    'is_archived'
  ]

  // Set FormData from props
  useEffect(() => {
    setDetailData(inputData)
    setFormData(filterDataArray(inputData, keep_items))
  }, [inputData])

  const handleEdit = (isEditable) => {
    setIsEditable(isEditable)
  }

  const handleSave = (data) => {
    setIsEditable(false)
    onHandleSave(data)
  }

  const Input = ({ name, ...rest }) => {
    return (
      <div className="input-group">
        <label>{name}</label>
        <input {...register(name)} {...rest} />
      </div>
    )
  }

  
  return (
    <div className="detail box">
      <div className="detail-header">
        <section className="detail-header-info">
          <span className="title">{detailData.name}</span>
          <small className="secondary">ID: {detailData.id}</small>
          <small>Poslední změna:{formatDate(detailData.updated_at)}</small>
        </section>
        <section className="detail-header-actions">
          <DetailButtons onEdit={handleEdit} onSave={handleSubmit(handleSave)} />
        </section>
      </div>
      <section className="detail-body">
        <form className="detail-form">
          {Object.keys(formData).map((item, index) => {
            return (
              <div key={index}>
                <Input
                  name={item}
                  defaultValue={formData[item]}
                  disabled={!isEditable}
                />
              </div>
            )
          })}
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
