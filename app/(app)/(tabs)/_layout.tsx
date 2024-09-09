import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Tabs } from 'expo-router'
import { Platform } from 'react-native'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'blue',
        headerStyle:
          Platform.OS === 'android'
            ? {
                height: 60,
                justifyContent: 'center'
              }
            : undefined,
        headerTitleStyle:
          Platform.OS === 'android'
            ? {
                marginTop: -50
              }
            : undefined
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',

          tabBarIcon: ({ color }) => <FontAwesome size={28} name='home' color={color} />
        }}
      />
      <Tabs.Screen
        name='settings'
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name='cog' color={color} />
        }}
      />
    </Tabs>
  )
}
