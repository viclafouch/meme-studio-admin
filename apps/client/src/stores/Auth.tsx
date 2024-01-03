/* eslint-disable promise/prefer-await-to-then */
import React from 'react'
import { useCookies } from 'react-cookie'
import wretch from 'wretch'

type AuthState = {
  token: string
  logout: () => Promise<void>
  login: ({
    email,
    password
  }: {
    email: string
    password: string
  }) => Promise<void>
}

const AuthContext = React.createContext<AuthState>(undefined as never)

type AuthProviderProps = {
  children: React.ReactNode
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [cookies, setCookie, removeCookie] = useCookies(['token'])

  const value = React.useMemo<AuthState>(() => {
    return {
      token: cookies.token as string,
      logout: async () => {
        removeCookie('token')

        return Promise.resolve()
      },
      login: async ({ email, password }) => {
        return wretch('/api/auth/login')
          .post({ email, password })
          .json<{ accessToken: string }>()
          .then(({ accessToken }) => {
            setCookie('token', accessToken)
          })
      }
    }
  }, [cookies.token, setCookie, removeCookie])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return React.useContext(AuthContext)
}

export default AuthProvider
