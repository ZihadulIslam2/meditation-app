// Define types for the affirmation gallery
export interface AffirmationCategory {
  title: string
  data: GalleryPreviewData[]
}

export interface GalleryPreviewData {
  id: number
  text: string
  image: any
}
