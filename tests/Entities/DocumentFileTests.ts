import DocumentFile from '../../src/Entities/DocumentFile'
import DocumentFileInterface from '../../src/Instances/DocumentFileInstance'
import UnitTestInterface from '../InitTestInterface'

const createDocumentFile = (): boolean => {
  const input: DocumentFileInterface = {
    id: 'ABC',
    name: 'Test Docuemnt Name',
    type: 'image/png',
    value: new File(['some data', 'another element'], 'filename.png')
  }

  const expectedOutput: DocumentFileInterface = {
    id: 'ABC',
    name: 'Test Docuemnt Name',
    type: 'image/png',
    value: new File(['some data', 'another element'], 'filename.png')
  }

  const documentFile = new DocumentFile(input)

  if (JSON.stringify(documentFile.props) === JSON.stringify(expectedOutput)) return true
  else return false
}

const unitTests: UnitTestInterface[] = [
  { name: 'Entity | User DocumentFile', test: createDocumentFile }
]

export default unitTests