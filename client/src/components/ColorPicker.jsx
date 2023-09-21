import React from 'react'
import { SketchPicker } from 'react-color'
import { useSnapshot } from 'valtio'

import state from '../store'

const ColorPicker = () => {
  const snap = useSnapshot(state)

  return (
    <div className='absolute left-full ml-2'>
      <SketchPicker 
        color={snap.color} 
        disableAlpha 
        presetColors={[
          '#143601', '#1a4301', '#245501', '#538d22', '#73a942', '#aad576', 
          '#00132d', '#00193b', '#001e45', '#002657', '#002d67', '#00377e', 
          '#ce6a85', '#d57d95', '#db90a4', '#e1a3b3', '#e7b5c2', '#f3dae1', 
          '#d00000', '#dc2f02', '#e85d04', '#f48c06', '#faa307', '#ffba08', 
        ]}
        onChange={(color) => state.color = color.hex}/>
    </div>
  )
}

export default ColorPicker