import React, { Component } from 'react'
import SelectedDocument from '../../Entities/SelctedDocument'
import './TextEditorView.css'

import Tesseract from 'tesseract.js'
import DocumentSection from '../../Entities/DocumentSection'
import Spinner from '../common/Spinner/Spinner'

type Props = {}
type State = {
  isOpen: boolean,
  processedScetions: { index: number, text: string}[],
  processingStatus: {index: number, progress: number}[],
  progress: number
}

class TextEditorView extends Component<Props, State> {
  selectedDocument: SelectedDocument
  constructor () {
    super({})
    this.state = {
      isOpen: false,
      processedScetions: [],
      processingStatus: [],
      progress: 0
    }
    this.selectedDocument = new SelectedDocument()
    document.addEventListener('toggleTextEditor', () => { this.toggleOpenTextEditor() })
  }

  proceessSections = async () => {
    this.setState({ processedScetions: [], processingStatus: [] })
    const documentSections = this.selectedDocument.sections

    if (!documentSections || documentSections.length < 0) return 

    let processedScetions: { index: number, text: string}[] = []
    documentSections.forEach(async (s: DocumentSection, index) => {
      const tempCanvas = document.createElement('canvas')
      tempCanvas.width = s.image.width
      tempCanvas.height = s.image.height
      const tempCanvasContext = tempCanvas.getContext('2d')
      tempCanvasContext?.putImageData(s.image, 0, 0)
      const sectionAsBase64 = tempCanvas.toDataURL()

      const text = await this.work(sectionAsBase64, index)
      processedScetions.push({index: index, text: text})
      this.setState({ processedScetions: processedScetions })
    })
  }

  work = async (documentSectionAsBase64: string, jobindex: number) => {
    const that = this
    const worker = Tesseract.createWorker({
      logger: m => {
        console.log(m)

        let status = { index: jobindex, progress: 0 }
        if (m.status === 'recognizing text') status = { index: jobindex, progress: m.progress || 0}

        const indexOfStatusStateToChange = this.state.processingStatus.findIndex((status: any) => {
          return status.index === jobindex
        })
        if (indexOfStatusStateToChange >= 0){
          this.state.processingStatus.splice(indexOfStatusStateToChange, 1)
        }
        let newProcessingState = this.state.processingStatus
        newProcessingState.push(status)
        that.setState({ processingStatus: newProcessingState})
      }
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
    const sectionElements = this.state.processedScetions.sort((a: any, b: any) => {
      return a.index - b.index
    }).map((s: any) => {
      return <section className='sectionAsText'>
        { s.text }
      </section>
    })
    return sectionElements
  }

  renderStatusElements = () => {
    const statusElements = this.state.processingStatus.sort((a, b) => {
      return a.index - b.index
    }).map((s: {index: number, progress: number}) => {
      return <span
        className='progressBar'
        style={{width: `${s.progress * 100}%`}}>
          Section { s.index + 1 } - { Math.floor(s.progress * 100) }% Processed
      </span>
    })
    return statusElements
  }

  render = () => {
    return (
      <div className={`TextEditorView ${this.state.isOpen ? 'textditorOpen' : '' }`}>
        <button  className='ghostButton fluid' onClick={this.proceessSections}>
          { (this.state.processingStatus.length > 0 && this.state.processedScetions.length < this.selectedDocument.sections!.length)  ? <Spinner /> : 'Process' }
        </button>
        { this.renderStatusElements() }
        { this.renderSectionsElemeents() }
      </div>
    )
  }
}

export default TextEditorView