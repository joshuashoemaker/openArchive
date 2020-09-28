import React, { Component } from 'react'
import SelectedDocument from '../../Entities/SelctedDocument'
import './TextEditorView.css'

import Tesseract from 'tesseract.js'
import DocumentSection from '../../Entities/DocumentSection'

type Props = {}
type State = { isOpen: boolean, textSections: string[], progress: number }

class TextEditorView extends Component<Props, State> {
  selectedDocument: SelectedDocument
  constructor () {
    super({})
    this.state = { isOpen: false, textSections: [], progress: 0 }
    this.selectedDocument = new SelectedDocument()
    document.addEventListener('toggleTextEditor', () => { this.toggleOpenTextEditor() })
    Tesseract.setLogging(true);
  }

  getTextFromSelectedDocument = async () => {
    const documentSections = this.selectedDocument.sections

    if (!documentSections || documentSections.length < 0) return 

    let sectionsAsText: string[] = []
    documentSections.forEach(async (s: DocumentSection) => {
      console.log(s)

      const tempCanvas = document.createElement('canvas')
      tempCanvas.width = s.image.width
      tempCanvas.height = s.image.height
      const tempCanvasContext = tempCanvas.getContext('2d')
      tempCanvasContext?.putImageData(s.image, 0, 0)
      const sectionAsBase64 = tempCanvas.toDataURL()
      console.log(sectionAsBase64)

      const text = await this.work(sectionAsBase64)
      sectionsAsText.push(text)
      console.log(sectionsAsText)
      this.setState({ textSections: sectionsAsText })
    })
  }

  work = async (documentSectionAsBase64: string) => {
    const worker = Tesseract.createWorker({
      logger: m => console.log(m)
    });
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');

    let result: any = await worker.detect(documentSectionAsBase64);
    console.log(result.data);

    result = await worker.recognize(documentSectionAsBase64);
    console.log(result.data);

    await worker.terminate();

    return result.data.text
  }

  toggleOpenTextEditor = () => {
    this.setState({isOpen: !this.state.isOpen})
  }

  renderSectionsElemeents = () => {
    const sectionElements = this.state.textSections.map((s: string) => {
      return <p className='sectionAsText'>
        { s }
      </p>
    })
    return sectionElements
  }

  render = () => {
    return (
      <div className={`TextEditorView ${this.state.isOpen ? 'textditorOpen' : '' }`}>
        <button className='fluid' onClick={this.getTextFromSelectedDocument}>Process</button>
        { this.renderSectionsElemeents() }
      </div>
    )
  }
}

export default TextEditorView