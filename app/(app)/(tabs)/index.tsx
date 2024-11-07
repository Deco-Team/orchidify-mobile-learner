import Constants from 'expo-constants'
import * as WebBrowser from 'expo-web-browser'
import { useState } from 'react'
import { Button, Text, View, StyleSheet } from 'react-native'

export default function App() {
  const [result, setResult] = useState<any>(null)

  const _handlePressButtonAsync = async () => {
    const result = await WebBrowser.openBrowserAsync(
      'https://docs.google.com/viewerng/viewer?url=http://res.cloudinary.com/orchidify/raw/upload/v1729267199/bmyv28vzk9ewqf71yx2g.docx'
    )
    setResult(result)
  }
  return (
    <View style={styles.container}>
      <Button title='Open WebBrowser' onPress={_handlePressButtonAsync} />
      <Text>{result && JSON.stringify(result)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1'
  }
})
