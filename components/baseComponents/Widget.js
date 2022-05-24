import React from 'react'

const Widget = (props) => {
   const title = props.title
   const data = props.data


  return (
    <div className="widget">
      <h3>{title}</h3>
      <span>Celkem nakoupeno: {data}%</span>
    </div>
  )
}

export default Widget