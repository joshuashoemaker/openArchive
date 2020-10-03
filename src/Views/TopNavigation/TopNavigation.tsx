import React, { Component } from 'react'
import './TopNavigation.css'

import menuIcon from '../../media/icons/addImageIcon.svg'
import textViewIcon from '../../media/icons/editFileicon.svg'
import logo from '../../media/logo.svg'

class TopNavigation extends Component {
  toggleAddFile: Event
  toggleTextEditorOpenEvent: Event
  constructor () {
    super({})
    this.toggleAddFile = new Event('toggleAddFile')
    this.toggleTextEditorOpenEvent = new Event('toggleTextEditor')
  }

  handleAddFileIconClick = () => {
    document.dispatchEvent(this.toggleAddFile)
  }

  handleTextEditorIconClick = () => {
    document.dispatchEvent(this.toggleTextEditorOpenEvent)
  }

  render = () => {
    return (
      <nav className="TopNavigation">
        <img id='mainNavIcon' className='menuIcon' src={menuIcon} alt='menu icon' onClick={this.handleAddFileIconClick} />
        <h1 id='navigationAppName' className='brandColor'> <img className='logo' alt='logo' src={logo} />extualize  </h1>
        <img id='mainNavIcon' className='menuIcon' src={textViewIcon} alt='view text icon' onClick={this.handleTextEditorIconClick} />
      </nav>
    )
  }
}

export default TopNavigation
