import React, { Component } from 'react'
import './FileTree.css'

import DocumentFileCollection from '../../Entities/Collections/DocumentFileCollection'
import DocumentFile from '../../Entities/DocumentFile'

type Props = {}
type State = {documentFiles: DocumentFile[]}

class FileTree extends Component<Props, State> {
  documentFileCollection: DocumentFileCollection
  constructor () {
    super({})
    this.documentFileCollection = new DocumentFileCollection()
    this.documentFileCollection.addActions(this.updateFileTree)
    this.state = { documentFiles: this.documentFileCollection.elements }
  }

  handleDocumentFileClick = (id: string) => {
    const selectDocumentFileEvent = new CustomEvent<string>('selectedFile', {detail: id})
    document.dispatchEvent(selectDocumentFileEvent)
  }

  updateFileTree = () => {
    this.setState({ documentFiles: this.documentFileCollection.elements })
  }

  renderFileTreeLineItmes = () => {
    const docuemntFiles = this.state.documentFiles
    const documentFileElements = docuemntFiles.map((d: DocumentFile) => {
      return (
        <li
          key={d.id}
          id={d.id}
          onClick={() => this.handleDocumentFileClick(d.id)}
          className='FileTreeLineItem ripple brandColor'>
          { d.name }
        </li>
      )
    })
    return documentFileElements
  }

  render = () => {
    return (
      <ul className='FileTree'>
        { this.renderFileTreeLineItmes() }
      </ul>
    )
  }
}

export default FileTree