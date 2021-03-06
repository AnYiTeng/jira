import { IUser, IList } from './index'
import { Table } from 'antd'
import { TableProps } from 'antd/es/table'
import dayjs from 'dayjs'

interface IProps extends TableProps<IList> {
  users: IUser[]
}

export default function List(props: IProps) {
  const { users } = props

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
          title: '部门',
          dataIndex: 'organization',
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
        {
          title: '创建时间',
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format('YYYY-MM-DD')
                  : '-'}
              </span>
            )
          },
        },
      ]}
      {...props}
    />
  )
}
