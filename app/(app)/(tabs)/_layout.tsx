import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Header } from '@react-navigation/elements'
import { Tabs } from 'expo-router'

import { myFontWeight } from '@/contracts/constants'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'blue'
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
                marginTop: -50
              }}
            />
          ),
          tabBarIcon: ({ color }) => <FontAwesome size={28} name='home' color={color} />
        }}
      />
      <Tabs.Screen
        name='settings'
        options={{
          header: () => (
            <Header
              title='Settings'
              headerStyle={{
                height: 60
              }}
              headerTitleStyle={{
                fontFamily: myFontWeight.bold,
                marginTop: -50
              }}
            />
          ),
          tabBarIcon: ({ color }) => <FontAwesome size={28} name='cog' color={color} />
        }}
      />
    </Tabs>
  )
}
