import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const DetailButtons = (props) => {
  const [isEditable, setIsEditable] = useState(false)
  const router = useRouter()

  // isEditable toggle
  const handleEditable = () => {
    props.onEdit(!isEditable)
    setIsEditable(!isEditable)
  }

  // Save button
  const handleSave = () => {
    props.onSave()
    setIsEditable(false)
  }

  return (
    <div>
      <button
        type="button"
        className={"btn btn-primary " + (!isEditable ? ' hidden' : '')}
        onClick={() => {
          handleSave()
        }}
      >
        Uložit
      </button>

      <button
        type="button"
        className="btn btn-default"
        onClick={() => {
          handleEditable()
        }}
      >
        {isEditable ? 'Zavřít' : 'Upravit'}
      </button>

      <button
        className="btn btn-default"
        onClick={() => {
          router.back()
        }}
      >
        Zpět
      </button>
    </div>
  )
}

export default DetailButtons
