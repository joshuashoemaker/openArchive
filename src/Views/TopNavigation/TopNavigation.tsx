import React, { Component } from 'react'
import './TopNavigation.css'

import menuIcon from '../../media/icons/barMenu.svg'
import textViewIcon from '../../media/icons/editFileicon.svg'

class TopNavigation extends Component {
  toggleMenuEvent: Event
  toggleTextEditorOpenEvent: Event
  constructor () {
    super({})
    this.toggleMenuEvent = new Event('toggleMenu')
    this.toggleTextEditorOpenEvent = new Event('toggleTextEditor')
  }

  handleMenuIconClick = () => {
    document.dispatchEvent(this.toggleMenuEvent)
  }

  handleTextEditorIconClick = () => {
    document.dispatchEvent(this.toggleTextEditorOpenEvent)
  }

  render = () => {
    return (
      <nav className="TopNavigation">
        <img id='mainNavIcon' className='menuIcon' src={menuIcon} alt='menu icon' onClick={this.handleMenuIconClick} />
        <h1 id='navigationAppName' className='brandColor'>Choice Archive</h1>
        <img id='mainNavIcon' className='menuIcon' src={textViewIcon} alt='view text icon' onClick={this.handleTextEditorIconClick} />
      </nav>
    )
  }
}

export default TopNavigation
