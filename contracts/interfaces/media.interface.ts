export interface IBase64Response {
  asset_id: string
  public_id: string
  url: string
  display_name: string
  original_filename: string
  original_extension: string
}

export interface IBase64Request {
  contents: string
  type: 'authenticated' | 'upload' | 'private'
  public_id: string
  folder: string
}
