import DocuemntSectionInterface from "../Instances/DocumentSectionInterface"

class DocumentSection {
  public readonly id: string
  public readonly documentId: string
  public readonly startX: number
  public readonly startY: number
  public readonly width: number
  public readonly height: number
  public readonly offsetX?: number
  public readonly offsetY?: number
  public readonly image: ImageData
  constructor (props: DocuemntSectionInterface) {
    this.id = props.id
    this.documentId = props.documentId
    this.startX = props.startX
    this.startY = props.startY
    this.width = props.width
    this.height = props.height
    this.offsetX = props.offsetX
    this.offsetY = props.offsetY
    this.image = props.imageData
  }

  get coordinates (): { startX: number, startY: number, width: number, height: number } {
    return {
      startX: this.startX,
      startY: this.startY,
      width: this.width,
      height: this.height
    }
  }
}

export default DocumentSection
