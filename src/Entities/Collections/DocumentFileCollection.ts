import DocumentFile from '../DocumentFile'

let instance: DocumentFileCollection | null = null

class DocumentFileCollection {
  public elements: DocumentFile[] = []
  public actions: Function[] = []

  constructor () {
    if (!instance) instance = this
    return instance
  }

  addElement = (documentFile: DocumentFile): void => {
    this.elements.push(documentFile)
    this.actions.forEach(a => { a() })
  }

  findById = (id: string): DocumentFile | undefined => {
    return this.elements.find((d: DocumentFile) => d.id === id)
  }

  findByName = (name: string): DocumentFile | undefined => {
    return this.elements.find((d: DocumentFile) => d.name === name)
  }

  removeById = (id: string): void => {
    const index = this.elements.findIndex((d: DocumentFile) => d.id === id)
    this.elements.splice(index, 1)
  }

  removeByName = (name: string): void => {
    const index = this.elements.findIndex((d: DocumentFile) => d.name === name)
    this.elements.splice(index, 1)
  }

  addActions = (action: Function) => {
    this.actions.push(action)
  }
}

export default DocumentFileCollection
