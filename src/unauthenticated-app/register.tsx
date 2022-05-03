import { useAuth } from 'context/auth-context'
import { Form, Input } from 'antd'
import { LongButton } from 'unauthenticated-app'
import { useAsync } from 'utils/use-async'

export default function RegisterView({
  onError,
}: {
  onError: (T: Error) => void
}) {
  const { register } = useAuth()
  const { run, isLoadig } = useAsync(undefined, { throwOnError: true })

  const handleSubmit = async ({
    cpassword,
    ...values
  }: {
    username: string
    password: string
    cpassword: string
  }) => {
    if (cpassword !== values.password) {
      onError(new Error('请确认两次密码是否相同'))
      return
    }
    try {
      await run(register(values))
    } catch (e: any) {
      onError(e)
    }
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
      <Form.Item
        name={'cpassword'}
        rules={[{ required: true, message: '请确认输入密码' }]}
      >
        <Input placeholder="请输入密码" type="password" id={'cpassword'} />
      </Form.Item>
      <LongButton loading={isLoadig} htmlType="submit" type="primary">
        注册
      </LongButton>
    </Form>
  )
}
