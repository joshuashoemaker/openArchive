import React, { Component } from 'react'
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

  constructor (props: Props) {
    super(props)
    this.canvas = React.createRef()
    this.documentFileCollection = new DocumentFileCollection()
    this.selectedDocument = new SelectedDocument()
    document.addEventListener('selectedFile', (e: CustomEventInit) => { this.handleSelectedDocumentFile(e.detail) })
  }

  componentDidMount = () => {
    this.canvasContext = this.canvas.current!.getContext('2d')
    this.canvas.current!.width = 0
    this.canvas.current!.height = 0
  }

  handleSelectedDocumentFile = async (id: string) => {
    this.selectedDocument.id = id
    const selectedDocumentFile = this.selectedDocument.document

    if (!selectedDocumentFile) return 

    const fileReader = new FileReader()
    fileReader.readAsDataURL(selectedDocumentFile.value)
    const image = new Image()
    
    if(!this.canvas.current) return

    fileReader.addEventListener('load', () => {
      image.src = fileReader.result as string
      image.onload = () => {
        this.canvas.current!.width = image.naturalWidth + 20
        this.canvas.current!.height = image.naturalHeight + 20
        this.canvasContext?.drawImage(image, 10, 10, image.width, image.height )
        this.props.updateSectionLayerSize(image.naturalWidth + 20, image.naturalHeight + 20)
        this.props.setImageCavas(this.canvasContext)
      }
    })
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
