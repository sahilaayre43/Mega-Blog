import React from 'react'
import MyLogo from '../assets/megablog.png'

function Logo({width = ""}) {
  return (
    <div className='flex justify-content items-center' style={{width}}>
      MEGA-BLOG
      {/* <img src={MyLogo} alt="Logo" style={{width}} /> */}
    </div>
  )
}

export default Logo
