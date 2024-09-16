/* eslint-disable react-hooks/exhaustive-deps */
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { useNavigation } from 'expo-router'
import { jwtDecode } from 'jwt-decode'
import { useContext, createContext, type PropsWithChildren, useState, useEffect } from 'react'

import { IUser } from '@/contracts/interfaces/auth.interface'
import { POST } from '@/utils/api.caller'
import { log } from '@/utils/logger'

const AuthContext = createContext<{
  login: (email: string, password: string) => Promise<boolean | string>
  logout: () => Promise<void>
  accessToken?: string | null
  refreshToken?: string | null
  user?: IUser | null
  setToken: (accessToken: string, refreshToken: string) => void
}>({
  login: () => Promise.resolve(false),
  logout: () => Promise.resolve(),
  accessToken: null,
  refreshToken: null,
  user: null,
  setToken: () => {}
})

// This hook can be used to access the user info.
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
  const [user, setUser] = useState<IUser | undefined>()
  const navigation = useNavigation()
  useEffect(() => {
    ;(async () => {
      try {
        const storedToken = await Promise.all([
          AsyncStorage.getItem('accessToken'),
          AsyncStorage.getItem('refreshToken')
        ])
        if (storedToken[0] && storedToken[1]) {
          setAccessToken(storedToken[0])
          setRefreshToken(storedToken[1])
          const decodedToken = jwtDecode(storedToken[0]) as IUser
          if (decodedToken.exp && decodedToken.exp * 1000 > Date.now()) {
            setUser({
              role: decodedToken.role as string,
              iat: decodedToken.iat as number,
              exp: decodedToken.exp as number,
              name: decodedToken.name as string,
              sub: decodedToken.sub as string
            })
          }
        }
      } catch (error) {
        log.error(error)
      }
      navigation.reset({
        index: 0,
        routes: [{ name: 'welcome' as never }]
      })
    })()
  }, [])

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
            const decodedToken = jwtDecode(data.data.accessToken) as IUser
            setUser({
              role: decodedToken.role as string,
              iat: decodedToken.iat as number,
              exp: decodedToken.exp as number,
              name: decodedToken.name as string,
              sub: decodedToken.sub as string
            })
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
            if (axios.isAxiosError(error)) {
              return error.response?.data.message
            } else {
              return 'Có lỗi xảy ra, vui lòng thử lại sau!'
            }
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
            await AsyncStorage.multiRemove(['refreshToken', 'accessToken'])
            setAccessToken(undefined)
            setRefreshToken(undefined)
            setUser(undefined)
          } catch (error) {
            log.error(error)
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
        user
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
