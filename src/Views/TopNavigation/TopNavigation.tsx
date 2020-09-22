import React, { Component } from 'react'
import './TopNavigation.css'

class TopNavigation extends Component {
  render = () => {
    return (
      <nav className="TopNavigation">
        <h1 id="navigationAppName" className="brandColor">Open Archive</h1>
      </nav>
    )
  }
}

export default TopNavigation
