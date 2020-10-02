import React, { Component } from 'react'
import DocumentFileController from '../../Controllers/DocumentFileController'
import './AddFileForm.css'

type Props = {}
type State = {}

class AddFileForm extends Component<Props, State> {
  toggleAddFile: Event
  controller: DocumentFileController
  fileNameInput: React.RefObject<HTMLInputElement>
  fileInput: React.RefObject<HTMLInputElement>
  constructor () {
    super({})
    this.toggleAddFile = new Event('toggleAddFile')
    this.controller = new DocumentFileController()
    this.fileNameInput = React.createRef()
    this.fileInput = React.createRef()
  }

  handleCancel = () => {
    document.dispatchEvent(this.toggleAddFile)
  }

  handleSubmit = () => {
    const name = this.fileNameInput.current?.value
    const files = this.fileInput.current?.files
    if (!name || !files) return

    this.controller.handleAddDocumentFile({name: name, value: files[0]})
    document.dispatchEvent(this.toggleAddFile)
  }

  render = () => {
    return (
      <div className='AddFileForm'>
        <h3>Add an Image</h3>
          <label htmlFor='documentFileLabel'>Document Label</label>
          <input ref={this.fileNameInput} type='text' name='documentFileLabel' />

        
        <input ref={this.fileInput} type='file' accept='image/*' name='documentFileInput' />
        
        <div className='addFormButtons'>
          <button className='ghostButton' onClick={this.handleCancel}>Cancel</button>
          <button onClick={this.handleSubmit}>submit</button>
        </div>
      </div>
    )
  }
}

export default AddFileForm