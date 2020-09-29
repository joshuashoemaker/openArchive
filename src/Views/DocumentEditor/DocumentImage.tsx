import React, { Component } from 'react'
import DocumentImageController from '../../Controllers/DocumentImageController'
import DocumentFileCollection from '../../Entities/Collections/DocumentFileCollection'
import SelectedDocument from '../../Entities/SelctedDocument'
import './DocumentEditorView.css'

type Props = { updateSectionLayerSize: Function, setImageCavas: Function }
type State = {} 

class DocumentImage extends Component<Props, State> {
  canvas: React.RefObject<HTMLCanvasElement>
  canvasContext: CanvasRenderingContext2D | null = null
  documentFileCollection: DocumentFileCollection
  selectedDocument: SelectedDocument
  controller: DocumentImageController

  constructor (props: Props) {
    super(props)
    this.canvas = React.createRef()
    this.documentFileCollection = new DocumentFileCollection()
    this.selectedDocument = new SelectedDocument()
    this.controller = new DocumentImageController()
    document.addEventListener('selectedFile', (e: CustomEventInit) => { this.handleSelectedDocumentFile(e.detail) })
  }

  componentDidMount = () => {
    this.canvasContext = this.canvas.current!.getContext('2d')
    this.canvas.current!.width = 0
    this.canvas.current!.height = 0
  }

  handleSelectedDocumentFile = async (id: string) => {
    this.selectedDocument.id = id
    if (!this.canvas.current || !this.canvasContext) return

    await this.controller.applySelectedDocuemntToCanvas(this.canvas.current, this.canvasContext)
    this.props.updateSectionLayerSize(this.canvas.current.width, this.canvas.current.height)
    this.props.setImageCavas(this.canvasContext)
  }

  render = () => {
    return (
      <div className="DocumentImage">
        <canvas ref={this.canvas} />
      </div>
    )
  }
}

export default DocumentImage
