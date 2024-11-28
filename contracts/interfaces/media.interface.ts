export interface IBase64Request {
  contents: string
  type: 'authenticated' | 'upload' | 'private'
  public_id: string
  folder: string
}
