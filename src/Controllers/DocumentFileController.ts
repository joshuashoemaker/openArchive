import DocumentFile from '../Entities/DocumentFile'
import { v4 as uuidv4 } from 'uuid'
import DocumentFileCollection from '../Entities/Collections/DocumentFileCollection'

class DocumentFileController {
  documentFileCollection: DocumentFileCollection
  constructor () {
    this.documentFileCollection = new DocumentFileCollection()
  }

  handleAddDocumentFile = (props: {name: string, value: File}): void => {
    const documentToAdd = new DocumentFile({
      id: uuidv4(),
      name: props.name,
      type: props.value.type,
      value: props.value
    })

    this.documentFileCollection.addElement(documentToAdd)
  }
}

export default DocumentFileController