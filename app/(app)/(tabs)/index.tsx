import { View, StyleSheet } from 'react-native'

import MyLink from '@/components/common/MyLink'

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <MyLink href='/_sitemap' text='Sitemap' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
