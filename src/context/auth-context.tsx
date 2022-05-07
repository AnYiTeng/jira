import React, { useState, ReactNode } from 'react'
import { IUser } from 'screens/projectList/index'
import * as auth from 'auth-provider'
import { http } from 'utils/http'
import { useMount } from 'utils'
import { useAsync } from 'utils/use-async'
import { FullPageLoading, FullPageErrorFallback } from 'components/lib'

interface IAuthForm {
  username: string
  password: string
}

const AuthContext = React.createContext<
  | {
      user: IUser | null
      login: (T: IAuthForm) => Promise<void>
      register: (T: IAuthForm) => Promise<void>
      logout: () => Promise<void>
    }
  | undefined
>(undefined)
AuthContext.displayName = 'MyAuthContext'

const bootstrapUser = async () => {
  let user = null
  const token = auth.getToken()
  if (token) {
    const data = await http('me', { token })
    user = data.user
  }
  return user
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user,
    error,
    isLoadig,
    isIdle,
    isError,
    run,
    setDate: setUser,
  } = useAsync<IUser | null>()

  const login = (form: IAuthForm) => auth.login(form).then(setUser)
  const register = (form: IAuthForm) => auth.register(form).then(setUser)
  const logout = () => auth.logout().then(() => setUser(null))

  useMount(() => {
    run(bootstrapUser())
  })

  if (isIdle || isLoadig) {
    return <FullPageLoading />
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />
  }

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  )
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth必须在AuthProvider中使用')
  }
  return context
}
