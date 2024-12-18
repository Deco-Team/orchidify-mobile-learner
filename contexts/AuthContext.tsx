import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from 'expo-router'
import { jwtDecode } from 'jwt-decode'
import { useContext, createContext, type PropsWithChildren, useState, useEffect } from 'react'

import { IUser } from '@/contracts/interfaces/auth.interface'
import { resolveError } from '@/utils'
import { POST } from '@/utils/api.caller'
import { log } from '@/utils/logger'

const AuthContext = createContext<{
  login: (email: string, password: string) => Promise<boolean | string | undefined>
  logout: () => Promise<string | undefined>
  saveFirebaseToken: (firebaseToken: string) => Promise<boolean | string | undefined>
  removeFirebaseToken: () => Promise<boolean | string | undefined>
  accessToken?: string | null
  refreshToken?: string | null
  firebaseToken?: string | null
  setToken: (accessToken: string, refreshToken: string) => void
}>({
  login: () => Promise.resolve(false),
  logout: () => Promise.resolve(''),
  saveFirebaseToken: () => Promise.resolve(false),
  removeFirebaseToken: () => Promise.resolve(false),
  accessToken: null,
  refreshToken: null,
  firebaseToken: null,
  setToken: () => {}
})

export function useSession() {
  const value = useContext(AuthContext)
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />')
    }
  }

  return value
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [accessToken, setAccessToken] = useState<string | undefined>()
  const [refreshToken, setRefreshToken] = useState<string | undefined>()
  const [firebaseToken, setFirebaseToken] = useState<string | undefined>()
  const navigation = useNavigation()
  useEffect(() => {
    ;(async () => {
      try {
        const storedToken = await Promise.all([
          AsyncStorage.getItem('accessToken'),
          AsyncStorage.getItem('refreshToken'),
          AsyncStorage.getItem('firebaseToken')
        ])
        if (storedToken[0] && storedToken[1]) {
          setAccessToken(storedToken[0])
          setRefreshToken(storedToken[1])
          const decodedToken = jwtDecode(storedToken[0]) as IUser
          if (decodedToken.exp && decodedToken.exp * 1000 > Date.now()) {
            navigation.reset({
              index: 0,
              routes: [{ name: '(app)' as never }]
            })
          }
        }

        if (storedToken[2]) {
          setFirebaseToken(storedToken[2])
        }
      } catch (error) {
        log.error(error)
        navigation.reset({
          index: 0,
          routes: [{ name: 'welcome' as never }]
        })
      }
    })()
  }, [navigation])

  return (
    <AuthContext.Provider
      value={{
        login: async (email, password) => {
          try {
            const { data } = await POST('auth/learner/login', { email, password }, {}, {})
            setAccessToken(data.data.accessToken)
            setRefreshToken(data.data.refreshToken)
            await AsyncStorage.setItem('accessToken', data.data.accessToken)
            await AsyncStorage.setItem('refreshToken', data.data.refreshToken)
            if (navigation.canGoBack()) {
              navigation.goBack()
            } else {
              navigation.reset({
                index: 0,
                routes: [{ name: 'welcome' as never }]
              })
            }
            return true
          } catch (error) {
            return resolveError(error)
          }
        },
        logout: async () => {
          try {
            await POST(
              'auth/learner/logout',
              { refreshToken },
              {},
              { Accept: 'application/json', Authorization: `Bearer ${refreshToken}` }
            )
            await AsyncStorage.removeItem('refreshToken')
            await AsyncStorage.removeItem('accessToken')
            await AsyncStorage.removeItem('firebaseToken')
            setAccessToken(undefined)
            setRefreshToken(undefined)
            setFirebaseToken(undefined)
          } catch (error) {
            return resolveError(error)
          }
        },
        saveFirebaseToken: async (firebaseToken: string) => {
          try {
            await AsyncStorage.setItem('firebaseToken', firebaseToken)
            setFirebaseToken(firebaseToken)
          } catch (error) {
            return resolveError(error)
          }
        },
        removeFirebaseToken: async () => {
          try {
            await AsyncStorage.removeItem('firebaseToken')
            setFirebaseToken(undefined)
          } catch (error) {
            return resolveError(error)
          }
        },
        setToken: async (accessToken, refreshToken) => {
          setAccessToken(accessToken)
          setRefreshToken(refreshToken)
          await AsyncStorage.setItem('accessToken', accessToken)
          await AsyncStorage.setItem('refreshToken', refreshToken)
        },
        accessToken,
        refreshToken,
        firebaseToken
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
