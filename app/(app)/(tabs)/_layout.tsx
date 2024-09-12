import Feather from '@expo/vector-icons/Feather'
import { Header } from '@react-navigation/elements'
import { Tabs } from 'expo-router'
import { useEffect, useState } from 'react'
import { ImageBackground, Platform, StyleSheet } from 'react-native'
import { Avatar, View } from 'react-native-ui-lib'

import MyText from '@/components/MyText'
import { myFontWeight, myTheme } from '@/contracts/constants'
import { IUser } from '@/contracts/interfaces/user.interface'

export default function TabLayout() {
  const [user, setUser] = useState<IUser>({
    email: '',
    _id: '',
    name: '',
    avatar: '',
    dateOfBirth: new Date(),
    phone: '',
    status: ''
  })
  const style = StyleSheet.create({
    button: {
      borderRadius: 15,
      paddingVertical: 7.5,
      paddingHorizontal: 18
    }
  })

  useEffect(() => {}, [])

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: myTheme.primary,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 65
        },
        tabBarIconStyle: {
          margin: 5
        }
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          header: () => (
            <Header
              title='Home'
              headerStyle={{
                height: 60
              }}
              headerTitleStyle={{
                fontFamily: myFontWeight.bold,
                marginTop: Platform.OS === 'ios' ? -25 : -50
              }}
            />
          ),
          tabBarIcon: ({ color, focused }) => (
            <View style={style.button} backgroundColor={focused ? myTheme.lighter : undefined}>
              <Feather size={28} name='home' color={color} />
            </View>
          )
        }}
      />
      <Tabs.Screen
        name='course'
        options={{
          header: () => (
            <Header
              title='Khóa học'
              headerStyle={{
                height: 60
              }}
              headerTitleStyle={{
                fontFamily: myFontWeight.bold,
                marginTop: Platform.OS === 'ios' ? -25 : -50
              }}
            />
          ),
          tabBarIcon: ({ color, focused }) => (
            <View style={style.button} backgroundColor={focused ? myTheme.lighter : undefined}>
              <Feather size={28} name='book' color={color} />
            </View>
          )
        }}
      />
      <Tabs.Screen
        name='mycourse'
        options={{
          header: () => (
            <Header
              title='Khóa học'
              headerStyle={{
                height: 60
              }}
              headerTitleStyle={{
                fontFamily: myFontWeight.bold,
                marginTop: Platform.OS === 'ios' ? -25 : -50
              }}
            />
          ),
          tabBarIcon: ({ color, focused }) => (
            <View style={style.button} backgroundColor={focused ? myTheme.lighter : undefined}>
              <Feather size={28} name='play-circle' color={color} />
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
                marginTop: Platform.OS === 'ios' ? -25 : -50
              }}
            />
          ),
          tabBarIcon: ({ color, focused }) => (
            <View style={style.button} backgroundColor={focused ? myTheme.lighter : undefined}>
              <Feather size={28} name='calendar' color={color} />
            </View>
          )
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          header: () => (
            <ImageBackground
              source={require('@/assets/images/profile-background.jpg')}
              resizeMode='cover'
              style={{ minHeight: '37.5%' }}
              borderBottomLeftRadius={40}
              borderBottomRightRadius={40}
            >
              <Header
                title='Trang cá nhân'
                headerStyle={{
                  borderBottomLeftRadius: 40,
                  borderBottomRightRadius: 40,
                  backgroundColor: 'transparent'
                }}
                headerTitleAlign='left'
                headerTitleStyle={{
                  fontFamily: myFontWeight.bold,
                  marginTop: Platform.OS === 'ios' ? -25 : -90,
                  color: '#FFF',
                  alignSelf: 'flex-start'
                }}
              />
              <Avatar
                size={80}
                containerStyle={{
                  alignSelf: 'center',
                  marginBottom: 10
                }}
                source={{
                  uri: 'https://lh3.googleusercontent.com/-cw77lUnOvmI/AAAAAAAAAAI/AAAAAAAAAAA/WMNck32dKbc/s181-c/104220521160525129167.jpg'
                }}
              />
              <MyText
                styleProps={{
                  alignSelf: 'center',
                  marginVertical: 5,
                  fontSize: 16,
                  fontFamily: myFontWeight.bold,
                  color: '#FFF'
                }}
                text='Phong'
              />
              <MyText
                styleProps={{
                  alignSelf: 'center',
                  fontSize: 15,
                  color: '#FFF'
                }}
                text='example@gmail.com'
              />
            </ImageBackground>
          ),
          tabBarIcon: ({ color, focused }) => (
            <View style={style.button} backgroundColor={focused ? myTheme.lighter : undefined}>
              <Feather size={28} name='user' color={color} />
            </View>
          )
        }}
      />
    </Tabs>
  )
}
