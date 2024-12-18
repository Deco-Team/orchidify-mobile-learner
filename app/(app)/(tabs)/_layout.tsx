import Feather from '@expo/vector-icons/Feather'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Header } from '@react-navigation/elements'
import { Tabs, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'
import { Avatar, View } from 'react-native-ui-lib'

import MyText from '@/components/common/MyText'
import { LEARNER_STATUS, myDeviceWidth, myFontWeight, myTextColor, myTheme, width } from '@/contracts/constants'
import { IUser } from '@/contracts/interfaces/user.interface'
import useUser from '@/hooks/api/useUser'

export default function TabLayout() {
  const router = useRouter()
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
    },
    classButton: {
      borderRadius: 15,
      paddingVertical: 7.5,
      paddingHorizontal: 18,
      borderWidth: 1,
      borderColor: myTheme.primary
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
        tabBarItemStyle: {
          borderRadius: 15
        },
        tabBarHideOnKeyboard: true
      }}
    >
      <Tabs.Screen
        name='index'
        listeners={{
          focus: async () => {
            const data = await getProfile()
            if (data && typeof data !== 'string') setUser(data)
          }
        }}
        options={{
          header: () => (
            <Header
              headerTitle={({ children }) => (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: (width * 10.5) / 12,
                    alignItems: 'center'
                  }}
                >
                  <View>
                    <MyText text={children} styleProps={{ fontSize: 20, fontFamily: myFontWeight.bold }} />
                    <View style={{ alignSelf: 'flex-start', flexDirection: 'row' }}>
                      <MyText text='Hãy khám phá' styleProps={{ fontSize: 14, marginRight: 5 }} />
                      <MyText
                        text='Orchidify!'
                        styleProps={{ fontSize: 14, fontFamily: myFontWeight.bold, color: myTextColor.primary }}
                      />
                    </View>
                  </View>
                  <TouchableOpacity onPress={() => router.push({ pathname: '/(app)/(home)/notification' })}>
                    <Feather name='bell' size={24} color='black' />
                  </TouchableOpacity>
                </View>
              )}
              title={`Xin chào ${user.name || ''} 👋`}
              headerTitleStyle={{
                fontFamily: myFontWeight.bold
              }}
            />
          ),
          tabBarIcon: ({ color, focused }) => (
            <View style={style.button} backgroundColor={focused ? myTheme.lighter : undefined}>
              <Feather size={width <= myDeviceWidth.sm ? 21 : 25} name='home' color={color} />
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
              headerTitleStyle={{
                fontFamily: myFontWeight.bold
              }}
            />
          ),
          tabBarIcon: ({ color, focused }) => (
            <View style={style.button} backgroundColor={focused ? myTheme.lighter : undefined}>
              <Feather size={width <= myDeviceWidth.sm ? 21 : 25} name='book' color={color} />
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
              headerTitleStyle={{
                fontFamily: myFontWeight.bold
              }}
            />
          ),
          tabBarIcon: ({ focused }) => (
            <View style={style.classButton} backgroundColor={focused ? myTheme.lighter : undefined}>
              <FontAwesome size={width <= myDeviceWidth.sm ? 28 : 32} name='play-circle' color={myTheme.primary} />
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
              headerTitleStyle={{
                fontFamily: myFontWeight.bold
              }}
            />
          ),
          tabBarIcon: ({ color, focused }) => (
            <View style={style.button} backgroundColor={focused ? myTheme.lighter : undefined}>
              <Feather size={width <= myDeviceWidth.sm ? 21 : 25} name='calendar' color={color} />
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
                  paddingTop: 25
                }}
              />
              <Avatar
                size={80}
                containerStyle={{
                  alignSelf: 'center'
                }}
                source={
                  user.avatar
                    ? { uri: user.avatar.replace('http://', 'https://') }
                    : require('@/assets/images/no_avatar.png')
                }
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
              <Feather size={width <= myDeviceWidth.sm ? 21 : 25} name='user' color={color} />
            </View>
          )
        }}
      />
    </Tabs>
  )
}
