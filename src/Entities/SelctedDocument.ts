import DocumentFileCollection from "./Collections/DocumentFileCollection"
import DocumentSectionCollection from "./Collections/DocumentSectionCollection"
import DocumentFile from "./DocumentFile"
import DocumentSection from "./DocumentSection"

let instance: SelectedDocument | null = null

class SelectedDocument {
  private documentFileId: string = ''
  private documentFileCollection: DocumentFileCollection
  private documentSectionCollection: DocumentSectionCollection

  constructor () {
    if (!instance) instance = this

    this.documentFileCollection = new DocumentFileCollection()
    this.documentSectionCollection = new DocumentSectionCollection()

    return instance
  }

  get document (): DocumentFile | undefined {
    return this.documentFileCollection.findById(this.documentFileId)
  }

  get sections (): DocumentSection[] | undefined {
    return this.documentSectionCollection.findManyByDocumentId(this.documentFileId)
  }

  get id (): string {
    return this.documentFileId
  }

  set id (value: string) {
    this.documentFileId = value
  }
}

export default SelectedDocument
