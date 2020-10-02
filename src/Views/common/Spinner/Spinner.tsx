import React, { Component } from 'react'
import './Spinner.css'

type Props = { message?: string, customClassName?: string }

class Spinner extends Component<Props> {
  render () {
    return (
      <div className={`spinnerWrapper ${this.props.customClassName}`}>
        <div className='spinner' />
        <span className='spinnerMessage'>{this.props.message || ''}</span>
      </div>
    )
  }
}

export default Spinner