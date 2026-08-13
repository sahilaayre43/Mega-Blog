import React from 'react'
import MyLogo from '../assets/ChatGPT.png'

function Logo({width = ""}) {
  return (
    <div className='flex justify-content items-center' style={{width}}>
       <img src={MyLogo} alt="Logo" style={{width}} /> 
    </div>
  )
}

export default Logo
