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

  // Save span
  const handleSave = () => {
    props.onSave()
    setIsEditable(false)
  }

  return (
    <>
      <span
        type="span"
        className={"action-btn" + (!isEditable ? ' hidden' : '')}
        onClick={() => {
          handleSave()
        }}
      >
        Uložit
      </span>

      <span
        className={"action-btn" + (!isEditable ? ' edit' : '')}
        onClick={() => {
          handleEditable()
        }}
      >
        {isEditable ? 'Zavřít' : 'Upravit'}
      </span>

      <span
        className="action-btn"
        onClick={() => {
          router.back()
        }}
      >
        Zpět
      </span>
    </>
  )
}

export default DetailButtons
