import React, { useEffect } from 'react'
import { useForm, useFieldArray, Controller } from 'react-hook-form'

const Form = (props) => {
  const data = props.data
  const isEditable = props.isEditable
  const onHanleChange = props.onDataChange
  const {handleSubmit, register} = useForm()

  const Input = ({ name, ...rest }) => {
    return (
      <div className="input-group">
        <label>{name}</label>
        <input {...register(name)} {...rest} />
      </div>
    )
  }

  return (
    <>
      <form id="myForm" className="detail-form" onSubmit={handleSubmit}>
        {Object.keys(data).map((item, index) => {
          return (
            <div key={index}>
              <Input
                name={item}
                type="text"
                defaultValue={data[item]}
                disabled={!isEditable}
              />
            </div>
          )
        })}
      </form>
    </>
  )
}

export default Form
