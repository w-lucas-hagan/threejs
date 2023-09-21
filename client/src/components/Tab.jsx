import React, { isValidElement } from 'react'
import { useSnapshot } from 'valtio'

import state from '../store'

const Tab = ({ tab, isFilterTab, isActiveTab, handleClick }) => {
  const snap = useSnapshot(state);

  // tabs recieve style based on active or non active state 
  const activeStyles = isFilterTab && isActiveTab
    ? { backgroundColor: snap.color, opacity: 0.5 }
    : { backgroundColor: 'transparent', opacity: 1 }

  return (
    <div 
      key={tab.name} 
      className={`tab-btn ${isFilterTab 
        ? 'rounded-full glassmorphism' 
        : 'rounded-4'}`} 
      onClick={handleClick}
      style={activeStyles}
    >
      {/* gives tabs their respective icon  */}
      <img 
        src={tab.icon} 
        alt={tab.name} 
        className={`${isFilterTab ? 'w-2/3 h-2/3' : 'w-11/12 h-11/12 object contain'}`}
      />
    </div>
  )
}

export default Tab