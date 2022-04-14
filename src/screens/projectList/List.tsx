import { IUser, IList } from './index'
import { Table } from 'antd'

interface IProps {
  users: IUser[]
  list: IList[]
}

export default function List(props: IProps) {
  const { users, list } = props

  return (
    <Table
      pagination={false}
      columns={[
        {
          title: '名称',
          dataIndex: 'name',
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: '负责人',
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  '未知'}
              </span>
            )
          },
        },
      ]}
      dataSource={list}
    />
  )
}
