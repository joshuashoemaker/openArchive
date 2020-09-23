import React, { Component } from 'react'
import './TopNavigation.css'

import menuIcon from '../../media/icons/barMenu.svg'
import settingIcon from '../../media/icons/verticalDotsMenu.svg'

class TopNavigation extends Component {
  render = () => {
    return (
      <nav className="TopNavigation">
        <img id='mainNavIcon' className='menuIcon' src={menuIcon} alt='menu icon' />
        <h1 id='navigationAppName' className='brandColor'>Choice Archive</h1>
        <img id='mainNavIcon' className='menuIcon' src={settingIcon} alt='menu icon' />
      </nav>
    )
  }
}

export default TopNavigation
