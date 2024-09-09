import { Redirect, Stack } from 'expo-router'

import { useSession } from '@/contexts/AuthContext'

export default function AppLayout() {
  const { idToken } = useSession()
  if (!idToken) {
    return <Redirect href='../welcome' />
  }
  return (
    <Stack>
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
    </Stack>
  )
}
