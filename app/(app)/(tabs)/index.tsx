import { View, Text, StyleSheet, Alert } from 'react-native'

import { useSession } from '@/contexts/AuthContext'

export default function Tab() {
  const { logout } = useSession()
  const { user } = useSession()
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
