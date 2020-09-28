import React, { Component, MouseEventHandler } from 'react'
import './Menu.css'

interface Props { icon: string, label: string, onClick: MouseEventHandler }
interface State {}

class MenuItem extends Component<Props, State> {
  render = () => {
    return (
      <div className='MenuItem' onClick={this.props.onClick}>
        <img className='menuIconIcon' alt='add icon' src={this.props.icon} />
        <span className='menuItemLabel'>
          { this.props.label }
        </span>
      </div>
    )
  }
}

export default MenuItem