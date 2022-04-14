import { IUser } from './index'
import { Input, Select } from 'antd'

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
    <form>
      <div>
        <Input
          type="text"
          value={params?.name}
          onChange={(e) =>
            setParams({
              ...params,
              name: e.target.value,
            })
          }
        />
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
      </div>
    </form>
  )
}
