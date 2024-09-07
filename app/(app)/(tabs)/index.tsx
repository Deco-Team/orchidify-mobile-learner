import { View, Text, StyleSheet } from 'react-native'

import { useSession } from '@/contexts/AuthContext'

export default function Tab() {
  const { logout } = useSession()

  return (
    <View style={styles.container}>
      <Text>Tab [Home|Settings]</Text>
      <Text
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          logout()
        }}
      >
        Logout
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
