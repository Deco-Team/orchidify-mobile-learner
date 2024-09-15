import React from 'react'
import { Alert, StyleSheet } from 'react-native'
import { Text, View } from 'react-native-ui-lib'

import { useSession } from '@/contexts/AuthContext'

const MyCourseScreen = () => {
  const { user, logout } = useSession()
  const handleLogout = () => {
    Alert.alert('Xác nhận đăng xuất', 'Bạn có muốn đăng xuất khỏi thiết bị này?', [
      {
        style: 'destructive',
        text: 'Đăng xuất',
        onPress: async () => await logout()
      },
      {
        style: 'cancel',
        text: 'Hủy'
      }
    ])
  }

  return (
    <View style={styles.container}>
      <Text>Hello {user?.name}</Text>
      <Text onPress={handleLogout}>Logout</Text>
    </View>
  )
}

export default MyCourseScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
