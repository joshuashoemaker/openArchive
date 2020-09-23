import React, { Component } from 'react'
import './App.css'
import FileTree from './FileTree/FileTree'
import TopNavigation from './TopNavigation/TopNavigation'

class App extends Component {
  render = () => {
    return (
      <div className="App">
        <TopNavigation />
        <FileTree />
      </div>
    )
  }
}

export default App
