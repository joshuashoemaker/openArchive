import DocumentSection from "../DocumentSection"

let instance: DocumentSectionCollection | null

class DocumentSectionCollection {
  public elements: DocumentSection[] = []
  public actions: Function[] = []

  constructor () {
    if (!instance) instance = this
    return instance
  }
  
  addElement = (documentSection: DocumentSection): void => {
    this.elements.push(documentSection)
    this.actions.forEach(a => { a() })
  }

  findById = (id: string): DocumentSection | undefined => {
    return this.elements.find((d: DocumentSection) => d.id === id)
  }

  findManyByDocumentId = (id: string): DocumentSection[] | undefined => {
    return this.elements.filter((d: DocumentSection) => d.documentId === id)
  }

  removeById = (id: string): void => {
    const index = this.elements.findIndex((d: DocumentSection) => d.id === id)
    this.elements.splice(index, 1)
  }

  addActions = (action: Function) => {
    this.actions.push(action)
  }
}

export default DocumentSectionCollection