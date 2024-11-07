import { useNavigation } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import { jwtDecode } from 'jwt-decode'
import { useContext, createContext, type PropsWithChildren, useState, useEffect } from 'react'

import { IUser } from '@/contracts/interfaces/auth.interface'
import { resolveError } from '@/utils'
import { POST } from '@/utils/api.caller'
import { log } from '@/utils/logger'

const AuthContext = createContext<{
  login: (email: string, password: string) => Promise<boolean | string | undefined>
  logout: () => Promise<void>
  accessToken?: string | null
  refreshToken?: string | null
  setToken: (accessToken: string, refreshToken: string) => void
}>({
  login: () => Promise.resolve(false),
  logout: () => Promise.resolve(),
  accessToken: null,
  refreshToken: null,
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
  const navigation = useNavigation()
  useEffect(() => {
    ;(async () => {
      try {
        const storedToken = await Promise.all([
          SecureStore.getItemAsync('accessToken'),
          SecureStore.getItemAsync('refreshToken')
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
            await SecureStore.setItemAsync('accessToken', data.data.accessToken)
            await SecureStore.setItemAsync('refreshToken', data.data.refreshToken)
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
            await SecureStore.deleteItemAsync('refreshToken')
            await SecureStore.deleteItemAsync('accessToken')
            setAccessToken(undefined)
            setRefreshToken(undefined)
          } catch (error) {
            return resolveError(error)
          }
        },
        setToken: async (accessToken, refreshToken) => {
          setAccessToken(accessToken)
          setRefreshToken(refreshToken)
          await SecureStore.setItemAsync('accessToken', accessToken)
          await SecureStore.setItemAsync('refreshToken', refreshToken)
        },
        accessToken,
        refreshToken
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
