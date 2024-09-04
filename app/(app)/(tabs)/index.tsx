import { View, Text, StyleSheet } from 'react-native'

import { useSession } from '@/contexts/ctx'

export default function Tab() {
  const { signOut } = useSession()

  return (
    <View style={styles.container}>
      <Text>Tab [Home|Settings]</Text>
      <Text
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          signOut()
        }}
      >
        Sign Out
      </Text>
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
