// custom button

import React from 'react'
import { useSnapshot } from 'valtio'

import state from '../store'
import { getContrastingColor } from '../config/helpers'

const CustomButton = ({ type, title, customStyles, handleClick }) => {

  const snap = useSnapshot(state)

  // generates the styles for different buttons on the page for better contrast 
  const generateStyles = (type) => {
    if(type === 'filled'){
      return {
        backgroundColor: snap.color,
        color: getContrastingColor(snap.color),
      }
    }else if(type === 'outline'){
      return{
        borderWidth: '1px',
        borderColor: snap.color,
        color: snap.color,
      }
    }
  }

  return (
    <button 
      className={`px-2 py-1.2 flex-1 rounded-md ${customStyles}`} 
      style={generateStyles(type)}
      onClick={handleClick}
    >
      {title}
    </button>
  )
}

export default CustomButton