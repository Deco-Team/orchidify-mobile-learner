export interface IGardenDetail {
  _id: string
  name: string
  description: string
  address: string
  images: string[]
  status: string
  maxClass: number
  gardenManagerId: string
  createdAt: string
  updatedAt: string
  gardenManager: {
    _id: string
    name: string
  }
}
