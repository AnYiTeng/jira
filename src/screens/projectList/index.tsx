import { useState } from 'react'
import { useMount, useDebounce } from 'utils'
import List from './List'
import SearchPanel from './SearchPanel'
import styled from '@emotion/styled'
import { useHttp } from 'utils/http'
import { useProject } from 'utils/use-project'
import { Typography } from 'antd'

export interface IUser {
  id: string
  name: string
  email: string
  title: string
  token: string
}

export interface IList {
  id: string
  name: string
  personId: string
  organization: string
  created: number
}

export default function ProjectListScreen() {
  const [users, setUsers] = useState<IUser[]>([])
  const [params, setParams] = useState({
    name: '',
    personId: '',
  })
  const debounceParams = useDebounce(params, 500)
  const client = useHttp()
  const { isLoadig, error, data: list } = useProject(debounceParams)

  useMount(() => {
    client('users').then((res) => {
      setUsers(res)
    })
  })

  return (
    <Container>
      <h1>项目列表 </h1>
      <SearchPanel users={users} params={params} setParams={setParams} />
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <List users={users} loading={isLoadig} dataSource={list || []} />
    </Container>
  )
}

const Container = styled.div`
  padding: 3.2rem;
`
