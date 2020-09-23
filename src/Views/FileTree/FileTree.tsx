import React, { Component } from 'react'
import './FileTree.css'

class FileTree extends Component {
  render = () => {
    return (
      <ul className='FileTree'>
        <li className='FileTreeLineItem ripple brandColor'>File Name</li>
      </ul>
    )
  }
}

export default FileTree