import { IUser } from './index'
import { Input, Select, Form } from 'antd'

interface IProps {
  users: IUser[]
  params: {
    name: string
    personId: string
  }
  setParams: (T: IProps['params']) => void
}

export default function SearchPanel(props: IProps) {
  const { users, params, setParams } = props

  return (
    <Form style={{ marginBottom: '2rem' }} layout="inline">
      <Form.Item>
        <Input
          placeholder="项目名"
          type="text"
          value={params?.name}
          onChange={(e) =>
            setParams({
              ...params,
              name: e.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <Select
          value={params?.personId}
          onChange={(value) =>
            setParams({
              ...params,
              personId: value,
            })
          }
        >
          <Select.Option value={''}>负责人</Select.Option>
          {users?.map((user) => {
            return (
              <Select.Option key={user.id} value={user.id}>
                {user.name}
              </Select.Option>
            )
          })}
        </Select>
      </Form.Item>
    </Form>
  )
}
