import React, { useState, useEffect } from 'react'
import { cleanObject, useMount, useDebounce } from 'utils'
import List from './List'
import SearchPanel from './SearchPanel'
import styled from '@emotion/styled'
import { useHttp } from 'utils/http'

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
  const [list, setList] = useState<IList[]>([])
  const debounceParams = useDebounce(params, 500)
  const client = useHttp()

  useEffect(() => {
    client('projects', { data: cleanObject(debounceParams) }).then((res) => {
      setList(res)
    })
  }, [debounceParams])

  useMount(() => {
    client('users').then((res) => {
      setUsers(res)
    })
  })

  return (
    <Container>
      <h1>项目列表 </h1>
      <SearchPanel users={users} params={params} setParams={setParams} />
      <List users={users} list={list} />
    </Container>
  )
}

const Container = styled.div`
  padding: 3.2rem;
`
