interface DocuemntSectionInterface {
  id: string,
  documentId: string,
  startX: number,
  startY: number,
  width: number,
  height: number,
  offsetX?: number,
  offsetY?:number,
  imageData: ImageData
}

export default DocuemntSectionInterface
