import React, { useState } from 'react'
import LoginView from './login'
import RegisterView from './register'
import { Card, Button } from 'antd'

export const UnAuthenticated = () => {
  const [isRegister, setIsRegister] = useState(false)

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Card>
        {isRegister ? <LoginView /> : <RegisterView />}
        <Button onClick={() => setIsRegister(!isRegister)}>
          切换到{isRegister ? '注册' : '登录'}
        </Button>
      </Card>
    </div>
  )
}
