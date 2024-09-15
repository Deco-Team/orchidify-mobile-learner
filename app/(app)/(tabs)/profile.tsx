import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useRouter } from 'expo-router'
import React from 'react'
import { Alert, StyleSheet } from 'react-native'
import { ListItem, View } from 'react-native-ui-lib'

import MyText from '@/components/MyText'
import { useSession } from '@/contexts/AuthContext'
import { myDeviceWidth, myFontWeight, myTheme, width } from '@/contracts/constants'
const ProfileScreen = () => {
  const router = useRouter()
  const { logout } = useSession()
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

  const style = StyleSheet.create({
    icon: {
      padding: 10,
      backgroundColor: myTheme.lightGrey,
      borderRadius: 17.5,
      width: 50,
      textAlign: 'center'
    }
  })

  const settingMenu = [
    {
      icon: <FontAwesome5 style={style.icon} name='user-cog' size={24} color={myTheme.primary} />,
      onPress: () => router.push('/(app)/(profile)/editprofile'),
      title: 'Cập nhật tài khoản'
    },
    {
      icon: <MaterialCommunityIcons style={style.icon} name='certificate' size={24} color={myTheme.primary} />,
      onPress: () => router.push('/(app)/(profile)/certificate'),
      title: 'Chứng chỉ của tôi'
    },
    {
      icon: <MaterialCommunityIcons style={style.icon} name='logout' size={24} color={myTheme.primary} />,
      onPress: () => handleLogout(),
      title: 'Đăng xuất'
    }
  ]

  return (
    <View style={{ paddingHorizontal: 20, gap: 24 }}>
      <MyText
        text='Cài đặt chung'
        styleProps={{
          fontSize: width < myDeviceWidth.sm ? 18 : 20,
          textAlign: 'left',
          marginVertical: 24,
          fontFamily: myFontWeight.bold
        }}
      />
      {settingMenu.map((value, i) => (
        <ListItem key={i} onPress={value.onPress}>
          <ListItem.Part containerStyle={{ flex: 1 }}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              {value.icon}
              <MyText styleProps={{ fontSize: width < myDeviceWidth.sm ? 16 : 18 }} text={value.title} />
            </View>
            <MaterialIcons name='keyboard-arrow-right' size={24} color='black' />
          </ListItem.Part>
        </ListItem>
      ))}
    </View>
  )
}

export default ProfileScreen
