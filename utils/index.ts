import * as ImagePicker from 'expo-image-picker'

export const extractMessage = (message: string, replace: string[]) => {
  let temp = message
  for (let i = 0; i < replace.length; i++) {
    temp = temp.replace('<>', replace[i])
  }
  return temp
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
    return result.assets
  }

  return null
}
