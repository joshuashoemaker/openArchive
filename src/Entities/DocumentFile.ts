import DocumentFileInterface from '../Instances/DocumentFileInterface'

class DocumentFile {
  public readonly id: string
  public readonly name: string
  public readonly type: string
  public readonly value: File

  constructor (props: DocumentFileInterface) {
    this.id = props.id
    this.name = props.name
    this.type = props.type
    this.value = props.value
  }

  get props (): DocumentFileInterface {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      value: this.value
    }
  }
}

export default DocumentFile