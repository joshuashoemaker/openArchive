import React, { Component } from 'react'
import DocumentSectionController from '../../Controllers/DocumentSectionController'
import DocumentSectionCollection from '../../Entities/Collections/DocumentSectionCollection'
import SelectedDocument from '../../Entities/SelctedDocument'
import './DocumentEditorView.css'

type Props = { height: number, width: number, getImageCanvas: Function }
type State = {} 

class DocumentSectionEditor extends Component<Props, State> {
  selectedDocument: SelectedDocument
  documentSectionCollection: DocumentSectionCollection
  controller: DocumentSectionController
  canvas: React.RefObject<HTMLCanvasElement>
  canvasContext: CanvasRenderingContext2D | null = null
  isMouseDown: boolean = false
  firstMouseX: number = 0
  firstMouseY: number = 0
  constructor (props: Props) {
    super(props)
    this.canvas = React.createRef()
    this.selectedDocument = new SelectedDocument()
    this.documentSectionCollection = new DocumentSectionCollection()
    this.controller = new DocumentSectionController()
    document.addEventListener('selectedFile', (e: CustomEventInit) => { this.handleSelectedDocumentFile(e.detail) })
  }

  componentDidMount = () => {
    this.canvasContext = this.canvas.current!.getContext('2d')
    this.canvas.current!.width = this.props.width
    this.canvas.current!.height = this.props.height
    this.drawSections()
  }

  drawSections = () => {
    if (!this.canvasContext) return
    this.canvasContext.clearRect(0, 0, this.canvas.current!.width, this.canvas.current!.height)
    const sections = this.selectedDocument.sections
    
    if (!sections) return

    sections.forEach(s => {
      this.canvasContext?.rect(
        s.startX,
        s.startY,
        s.width,
        s.height
      )
      this.canvasContext!.strokeStyle = '#dc8dec'
      this.canvasContext!.lineWidth = 2
      this.canvasContext!.stroke()
    })
  }

  handleSelectedDocumentFile = async (id: string) => {
    this.selectedDocument.id = id
    this.drawSections()
  }

  handleMouseDown = (e: any) => {
    const bounds = this.canvas.current!.getBoundingClientRect();

    const canvasOffsetX = bounds.left
    const canvasOffsetY = bounds.top

    this.firstMouseX = e.clientX - canvasOffsetX
    this.firstMouseY = e.clientY - canvasOffsetY
    this.isMouseDown = true
  }

  handleMouseUp = (e: any) => {
    this.isMouseDown = false
    const bounds = this.canvas.current!.getBoundingClientRect();
    const imageCanvasContext = this.props.getImageCanvas()

    const canvasOffsetX = bounds.left
    const canvasOffsetY = bounds.top
    const mouseX = e.clientX - canvasOffsetX
    const mouseY = e.clientY - canvasOffsetY
    const width = mouseX - this.firstMouseX
    const height = mouseY - this.firstMouseY

    this.controller.handleAddSection({
      documentId: this.selectedDocument.id,
      startX: this.firstMouseX,
      startY: this.firstMouseY,
      width: width,
      height: height,
      offsetX: canvasOffsetX,
      offsetY: canvasOffsetY,
      imageData: imageCanvasContext!.getImageData(this.firstMouseX, this.firstMouseY, width, height)
    })
    this.drawSections()
  }

  handleMouseMove = (e: any) => {
    const bounds = this.canvas.current!.getBoundingClientRect();

    const canvasOffsetX = bounds.left
    const canvasOffsetY = bounds.top

    let mouseX = e.clientX - canvasOffsetX
    let mouseY = e.clientY - canvasOffsetY
    
    if (this.isMouseDown) {
      this.canvasContext!.clearRect(0, 0, this.canvas.current!.width, this.canvas.current!.height)
      this.drawSections()
      this.canvasContext!.beginPath()
      const width = mouseX - this.firstMouseX
      const height = mouseY - this.firstMouseY
      this.canvasContext?.rect(this.firstMouseX, this.firstMouseY, width, height)
      this.canvasContext!.strokeStyle = 'black'
      this.canvasContext!.lineWidth = 2
      this.canvasContext!.stroke()
    }
  }

  render = () => {
    return (
      <div className="DocumentSectionEditor">
        <canvas
          width={this.props.width}
          height={this.props.height}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onMouseMove={this.handleMouseMove}
          ref={this.canvas} />
          {/* <button onClick={this.drawSections}> Refresh</button> */}
      </div>
    )
  }
}

export default DocumentSectionEditor
