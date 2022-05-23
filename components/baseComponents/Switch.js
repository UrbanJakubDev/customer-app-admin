import React from 'react'

const ToogleSwitch = () => {
  return (
    <div className="switch-container">
       <span className="switch-title">Title</span>
         <label className="switch">
             <input type="checkbox" />
            <span className="slider round"></span>
         </label>
    </div>
  )
}

export default ToogleSwitch