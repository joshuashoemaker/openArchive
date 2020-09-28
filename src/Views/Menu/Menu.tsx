import React, { Component } from 'react'
import './Menu.css'
import MenuItem from './MenuItem'

import addImageIcon from '../../media/icons/addImageIcon.svg'

type Props = {}
type State = { isMenuOpen: boolean }

class Menu extends Component<Props, State> {
  toggleAddFile: Event
  constructor () {
    super({})
    this.state = { isMenuOpen: false }
    document.addEventListener('toggleMenu', () => { this.toggleMenu() })

    this.toggleAddFile = new Event('toggleAddFile')
  }

  toggleAddFileForm = () => {
    document.dispatchEvent(this.toggleAddFile)
    this.setState({isMenuOpen: !this.state.isMenuOpen})
  }

  toggleMenu = () => {
    this.setState({isMenuOpen: !this.state.isMenuOpen})
  }

  render = () => {
    return (
      <div className={`Menu ${this.state.isMenuOpen ? 'menuOpen' : '' }`}>
        <MenuItem icon={addImageIcon} label='Add Image' onClick={this.toggleAddFileForm} />
      </div>
    )
  }
}

export default Menu