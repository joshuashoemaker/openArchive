import React, { Component } from 'react'
import AddFileForm from './AddFileForm'
import './AddFileView.css'

type Props = {}
type State = {}

class AddFileView extends Component<Props, State> {
  constructor () {
    super({})
  }

  render = () => {
    return (
      <div className='AddFileView'>
        <AddFileForm />
      </div>
    )
  }
}

export default AddFileView
