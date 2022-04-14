import React, { useState, useEffect } from 'react'
import { cleanObject, useMount, useDebounce } from 'utils'
import List from './List'
import SearchPanel from './SearchPanel'
import qs from 'qs'
import { useHttp } from 'utils/http'

export interface IUser {
  id: string
  name: string
  email: string
  title: string
  organization: string
  token: string
}

export interface IList {
  id: string
  name: string
  personId: string
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
    <>
      <SearchPanel users={users} params={params} setParams={setParams} />
      <List users={users} list={list} />
    </>
  )
}
