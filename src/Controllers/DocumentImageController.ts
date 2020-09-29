import SelectedDocument from "../Entities/SelctedDocument"

interface dimensions { width: number, height: number }

class DocumentImageController {
  applySelectedDocuemntToCanvas = async (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D): Promise<dimensions> => {
    const selectedDocument = new SelectedDocument()
    const documentAsBase64 = await this.loadFile(selectedDocument)
    if (!documentAsBase64) return { width: 0, height: 0 }
    const image = await this.loadImage(documentAsBase64)

    canvas.width = image.naturalWidth
    canvas.height = image.naturalHeight
    context.drawImage(image, 10, 10, image.width, image.height)

    return { width: image.naturalHeight + 20, height: image.naturalHeight + 20 }
  }

  private loadFile (document: SelectedDocument): Promise<string> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(document.document!.value)
      fileReader.onload = () => resolve(fileReader.result as string)
      fileReader.onerror = error => reject(error)
    })
  }

  private loadImage (documentAsBase64: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const image = new Image()
      image.src = documentAsBase64
      image.onload = () => resolve(image)
      image.onerror = (error) => reject(error)
    })
  }
}

export default DocumentImageController
