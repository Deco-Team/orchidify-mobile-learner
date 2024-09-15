import * as ImagePicker from 'expo-image-picker'

export const extractMessage = (message: string, replace: string[]) => {
  let temp = message
  for (let i = 0; i < replace.length; i++) {
    temp = temp.replace('<>', replace[i])
  }
  return temp
}

export async function urltoFile(url: string, filename: string, mimeType: string): Promise<File> {
  if (url.startsWith('data:')) {
    const arr = url.split(',')
    const mime = arr[0].match(/:(.*?);/)?.[1] || mimeType
    const bstr = atob(arr[arr.length - 1])
    const n = bstr.length
    const u8arr = new Uint8Array(n)

    for (let i = 0; i < n; i++) {
      u8arr[i] = bstr.charCodeAt(i)
    }

    const file = new File([u8arr], filename, { type: mime })
    return Promise.resolve(file)
  }

  return fetch(url)
    .then((res) => res.arrayBuffer())
    .then((buf) => new File([buf], filename, { type: mimeType }))
}

export const pickImage = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    base64: true,
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1
  })
  if (!result.canceled) {
    // const imageUri = result.assets[0].uri
    // const imageName = result.assets[0].fileName
    // const mimeType = result.assets[0].mimeType
    // if (imageUri && imageName && mimeType) {
    //   const file = await urltoFile(imageUri, imageName, mimeType)
    //   return { file, name: imageName, uri: imageUri }
    // }
    return result.assets
  }

  return null
}

export function cloudinaryURLConvert(publicId: string) {
  return `https://res.cloudinary.com/${process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${publicId}`.trim()
}
