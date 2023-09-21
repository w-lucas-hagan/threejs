// customizer page

import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSnapshot } from 'valtio'

import config from '../config/config'
import state from '../store';
import { download } from '../assets'
import { downloadCanvasToImage, reader } from '../config/helpers'
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants'
import { fadeAnimation, slideAnimation } from '../config/motion'

import { AIPicker, ColorPicker, CustomButton, FilePicker, Tab } from '../components'

const Customizer = () => {
  const snap = useSnapshot(state)

  // useState variables 
  const [file, setFile] = useState('')
  const [prompt, setPrompt] = useState('')
  const [generatingImg, setGeneratingImg] = useState(false)

  const [activeEditorTab, setActiveEditorTab] = useState('')
  const [activeFilterTab, setActiveFilterTab] = useState({logoShirt: true, stylishShirt: false})

  // function to show tab content depending on the active tab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case 'colorpicker':
        return <ColorPicker />
      case 'filepicker':
        return <FilePicker file={file} setFile={setFile} readFile={readFile}/>
      case 'aipicker':
        return <AIPicker prompt={prompt} setPrompt={setPrompt} generatingImg={generatingImg} handleSubmit={handleSubmit}/>
      default:
        return null
    }
  }

  const handleSubmit = async (type) => {
    if(!prompt) return alert('Please enter a prompt!')

    try {
      setGeneratingImg(true)
      
      // call to backend to generate an AI image
      const response = await fetch('http://localhost:8080/api/v1/dalle', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application.json'
        },
        body: JSON.stringify({prompt})
      })

      // storing the response from the server in data variable
      const data = await response.json()

      // updating the shirt model
      handleDecals(type, `data:image/png;base64,${data.photo}`)

    } catch (error) {
      alert(error)
    } finally {
      setGeneratingImg(false)
      setActiveEditorTab('')
    }
  }

  // function to update shirt based on file type and result 
  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type]

    state[decalType.stateProperty] = result

    if(!activeFilterTab[decalType.filterTab]){
      handleActiveFilterTab(decalType.filterTab)
    }
  }

  // handles if we are using logo, full, or both textures 
  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case 'logoShirt':
        state.isLogoTexture = !activeFilterTab[tabName]
        break;
      case 'stylishShirt':
        state.isFullTexture = !activeFilterTab[tabName]
      default:
        state.isLogoTexture = true
        state.isFullTexture = false
    }

    // after setting the state, activeFilterTab to update UI 
    setActiveFilterTab((prevState) =>{
      return {
        ...prevState,
        [tabName] : !prevState[tabName]
      }
    })
  }

  // read the file to get the input image 
  const readFile = (type) => {
    reader(file).then((result) => {
        handleDecals(type, result)
        setActiveEditorTab('')
      })
  }

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>

          {/* left toolbar div */}
          <motion.div key='custom' className='absolute top-0 left-0 z-10' {...slideAnimation('left')}>
            <div className='flex items-center min-h-screen'>
              <div className='editortabs-container tabs'>
                {/* each item in the toolbar  */}
                {EditorTabs.map((tab) => (
                  <Tab key={tab.name} tab={tab} handleClick={() => setActiveEditorTab(tab.name)} />
                ))}

                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          {/* go back button  */}
          <motion.div className='absolute z-10 top-5 right-5' {...fadeAnimation}>
            <CustomButton type='filled' title='Go Back' handleClick={() => state.intro = true} customStyles='w-fit px-4 py-2.5 font-bold text-sm'/>
          </motion.div>

          {/* bottom toolbar div  */}
          <motion.div className='filtertabs-container' {...slideAnimation('up')}>
            {FilterTabs.map((tab) => (
              <Tab key={tab.name} tab={tab} isFilterTab isActiveTab={activeFilterTab[tab.name]} handleClick={() => handleActiveFilterTab(tab.name)} />
            ))} 
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Customizer