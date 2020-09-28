import React, { Component } from 'react'
import './DocumentEditorView.css'
import DocumentImage from './DocumentImage'
import DocumentSectionEditor from './DocumentScetionEditor'

type Props = {}
type State = { sectionEditorWidth: number, sectionEditorHeight: number } 

class DocumentEditorView extends Component<Props, State> {
  imageCanvas: CanvasRenderingContext2D | null = null
  constructor () {
    super({})
    this.state = {
      sectionEditorWidth: 0,
      sectionEditorHeight: 0
    }
  }

  updateSectionLayerSize = (width: number, height:number) => {
    this.setState({
      sectionEditorHeight: height,
      sectionEditorWidth: width
    })
  }

  setImageCavas = (canvas: CanvasRenderingContext2D) => {
    this.imageCanvas = canvas
  }

  getImageCanvas = (): CanvasRenderingContext2D | null => {
    return this.imageCanvas
  }

  render = () => {
    return (
      <div className="DocumentEditorView">
          <DocumentImage setImageCavas={this.setImageCavas} updateSectionLayerSize={this.updateSectionLayerSize} />
          <DocumentSectionEditor getImageCanvas={this.getImageCanvas} height={this.state.sectionEditorHeight} width={this.state.sectionEditorWidth} />
      </div>
    )
  }
}

export default DocumentEditorView
