import React, { Component } from 'react'
import AddFileView from './AddFile/AddFileView'
import DocumentEditorView from './DocumentEditor/DocumentEditorView'
import FileTree from './FileTree/FileTree'
import Menu from './Menu/Menu'
import TextEditorView from './TextEditor/TextEditorView'
import TopNavigation from './TopNavigation/TopNavigation'

import DocumentFileCollection from '../Entities/Collections/DocumentFileCollection' 

import './App.css'

type Props = {}
type State = { isAddFileOpen: boolean } 

class App extends Component<Props, State> {
  documentFileCollection = new DocumentFileCollection ()
  constructor () {
    super({})
    this.state = { isAddFileOpen: false }
    document.addEventListener('toggleAddFile', () => { this.toggleAddFile() })
  }

  componentDidMount = () => {
    if (this.documentFileCollection.elements.length <1 ) this.setState({ isAddFileOpen: true })
  }

  toggleAddFile = () => {
    this.setState({ isAddFileOpen: !this.state.isAddFileOpen })
  }

  render = () => {
    return (
      <div className="App">
        <TopNavigation />
        <FileTree />
        <Menu />
        <TextEditorView />
        <div className='Workspace'>

          <DocumentEditorView />
          
          { this.state.isAddFileOpen ? <AddFileView /> : '' }
        </div>
      </div>
    )
  }
}

export default App
