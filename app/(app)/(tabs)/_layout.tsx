import Feather from '@expo/vector-icons/Feather'
import { Header } from '@react-navigation/elements'
import { Tabs } from 'expo-router'
import { useState } from 'react'
import { ImageBackground, StyleSheet } from 'react-native'
import { Avatar, View } from 'react-native-ui-lib'

import MyText from '@/components/MyText'
import { height, LEARNER_STATUS, myDeviceHeight, myFontWeight, myTheme } from '@/contracts/constants'
import { IUser } from '@/contracts/interfaces/user.interface'
import useUser from '@/hooks/api/useUser'

export default function TabLayout() {
  const { getProfile } = useUser()
  const [user, setUser] = useState<IUser>({
    email: '',
    _id: '',
    name: '',
    avatar: '',
    dateOfBirth: new Date(),
    phone: '',
    status: LEARNER_STATUS.INACTIVE
  })
  const style = StyleSheet.create({
    button: {
      borderRadius: 15,
      paddingVertical: 7.5,
      paddingHorizontal: 18
    }
  })

  return (
    <Tabs
      sceneContainerStyle={{
        backgroundColor: '#FFF'
      }}
      screenOptions={{
        tabBarActiveTintColor: myTheme.primary,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 65
        },
        tabBarIconStyle: {
          margin: 5
        },
        tabBarHideOnKeyboard: true
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          header: () => (
            <Header
              title='Home'
              headerLeftContainerStyle={{ backgroundColor: 'pink' }}
              headerStyle={{
                height: 60
              }}
              headerTitleStyle={{
                fontFamily: myFontWeight.bold,
                marginTop: height < myDeviceHeight.sm ? -height / 25 : -height / 20
              }}
            />
          ),
          tabBarIcon: ({ color, focused }) => (
            <View style={style.button} backgroundColor={focused ? myTheme.lighter : undefined}>
              <Feather size={height <= myDeviceHeight.sm ? 24 : 28} name='home' color={color} />
            </View>
          )
        }}
      />
      <Tabs.Screen
        name='courses'
        options={{
          header: () => (
            <Header
              title='Khóa học'
              headerLeftContainerStyle={{ backgroundColor: 'pink' }}
              headerStyle={{
                height: 60
              }}
              headerTitleStyle={{
                fontFamily: myFontWeight.bold,
                marginTop: height < myDeviceHeight.sm ? -height / 25 : -height / 20
              }}
            />
          ),
          tabBarIcon: ({ color, focused }) => (
            <View style={style.button} backgroundColor={focused ? myTheme.lighter : undefined}>
              <Feather size={height <= myDeviceHeight.sm ? 24 : 28} name='book' color={color} />
            </View>
          )
        }}
      />
      <Tabs.Screen
        name='myclass'
        options={{
          header: () => (
            <Header
              title='Lớp học của tôi'
              headerStyle={{
                height: 60
              }}
              headerTitleStyle={{
                fontFamily: myFontWeight.bold,
                marginTop: height < myDeviceHeight.sm ? -height / 25 : -height / 20
              }}
            />
          ),
          tabBarIcon: ({ color, focused }) => (
            <View style={style.button} backgroundColor={focused ? myTheme.lighter : undefined}>
              <Feather size={height <= myDeviceHeight.sm ? 24 : 28} name='play-circle' color={color} />
            </View>
          )
        }}
      />
      <Tabs.Screen
        name='timesheet'
        options={{
          header: () => (
            <Header
              title='Thời khóa biểu'
              headerStyle={{
                height: 60
              }}
              headerTitleStyle={{
                fontFamily: myFontWeight.bold,
                marginTop: height < myDeviceHeight.sm ? -height / 25 : -height / 20
              }}
            />
          ),
          tabBarIcon: ({ color, focused }) => (
            <View style={style.button} backgroundColor={focused ? myTheme.lighter : undefined}>
              <Feather size={height <= myDeviceHeight.sm ? 24 : 28} name='calendar' color={color} />
            </View>
          )
        }}
      />
      <Tabs.Screen
        name='profile'
        listeners={{
          focus: async () => {
            const data = await getProfile()
            if (data && typeof data !== 'string') setUser(data)
          }
        }}
        options={{
          header: () => (
            <ImageBackground
              source={require('@/assets/images/profile-background.jpg')}
              resizeMode='cover'
              borderBottomLeftRadius={40}
              borderBottomRightRadius={40}
              style={{ flexDirection: 'column', paddingBottom: 24, marginTop: -35 }}
            >
              <Header
                title='Trang cá nhân'
                headerStyle={{
                  borderBottomLeftRadius: 40,
                  borderBottomRightRadius: 40,
                  backgroundColor: 'transparent',
                  height: 100
                }}
                headerTitleAlign='left'
                headerTitleStyle={{
                  fontFamily: myFontWeight.bold,
                  color: '#FFF',
                  marginTop: height < myDeviceHeight.sm ? undefined : -height / 20
                }}
                headerTitleContainerStyle={{
                  minHeight: 80
                }}
              />
              <Avatar
                size={80}
                containerStyle={{
                  alignSelf: 'center'
                }}
                source={{
                  uri: user.avatar ? user.avatar : 'https://avatar.iran.liara.run/public'
                }}
              />
              <MyText
                styleProps={{
                  alignSelf: 'center',
                  fontSize: 16,
                  fontFamily: myFontWeight.bold,
                  color: '#FFF'
                }}
                text={user.name || ''}
              />
              <MyText
                styleProps={{
                  alignSelf: 'center',
                  color: '#FFF'
                }}
                text={user.email}
              />
            </ImageBackground>
          ),
          tabBarIcon: ({ color, focused }) => (
            <View style={style.button} backgroundColor={focused ? myTheme.lighter : undefined}>
              <Feather size={height <= myDeviceHeight.sm ? 24 : 28} name='user' color={color} />
            </View>
          )
        }}
      />
    </Tabs>
  )
}
