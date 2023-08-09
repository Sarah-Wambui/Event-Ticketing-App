import React from 'react'
import logo from './assets/thislogo.png'

function Header() {
  return (
    <div>
      <header className='wizard-header'>
        <img src={logo} alt='Logo' className='logo-image' />
      </header>
    </div>
  )
}

export default Header
