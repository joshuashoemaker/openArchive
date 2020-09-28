import DocumentSectionCollection from "../Entities/Collections/DocumentSectionCollection"
import DocumentSection from "../Entities/DocumentSection"
import { v4 as uuidv4 } from 'uuid'

interface AddSectionInterface {
  documentId: string,
  startX: number,
  startY: number,
  width: number,
  height: number,
  offsetX?: number,
  offsetY?:number,
  imageData: ImageData
}

class DocumentSectionController {
  documentSectionCollection: DocumentSectionCollection
  constructor () {
    this.documentSectionCollection = new DocumentSectionCollection()
  }
  
  handleAddSection = (documentSection: AddSectionInterface) => {
    const sectionToAdd = new DocumentSection({
      id: uuidv4(),
      ...documentSection
    })
    this.documentSectionCollection.addElement(sectionToAdd)
    console.log(sectionToAdd)
  }
}

export default DocumentSectionController