import React, { useState } from 'react'
import LoginView from './login'
import RegisterView from './register'

export const UnAuthenticated = () => {
  const [isRegister, setIsRegister] = useState(false)

  return (
    <div>
      {isRegister ? <LoginView /> : <RegisterView />}
      <button onClick={() => setIsRegister(!isRegister)}>
        切换到{isRegister ? '注册' : '登录'}
      </button>
    </div>
  )
}
