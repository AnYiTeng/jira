import { useAuth } from 'context/auth-context'
import { Form, Button, Input } from 'antd'

export default function RegisterView() {
  const { register, user } = useAuth()

  const handleSubmit = (values: { username: string; password: string }) => {
    register(values)
  }

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={'username'}
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input placeholder="请输入用户名" type="text" id={'username'} />
      </Form.Item>
      <Form.Item
        name={'password'}
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input placeholder="请输入密码" type="password" id={'password'} />
      </Form.Item>
      <Button htmlType="submit" type="primary">
        注册
      </Button>
    </Form>
  )
}
