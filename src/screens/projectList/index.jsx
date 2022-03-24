import React, { useState, useEffect } from "react";
import { cleanObject, useMount, useDebounce } from "utils";
import List from "./List";
import SearchPanel from "./SearchPanel";
import * as qs from "qs";

const apiUrl = process.env.REACT_APP_API_URL
 
export default function ProjectListScreen() {
  const [users, setUsers] = useState([])
  const [params, setParams] = useState({
    name: '',
    personId: ''
  })
  const [list, setList] = useState([])
  const debounceParams = useDebounce(params, 500)

  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debounceParams))}`)
      .then(async (response) => {
        if (response.ok) {
          setList(await response.json())
        }
      })
  }, [debounceParams])

  useMount(() => {
    fetch(`${apiUrl}/users`)
      .then(async (response) => {
        if (response.ok) {
          setUsers(await response.json())
        }
      })
  })

  return (
    <>
      <List users={users} list={list} />
      <SearchPanel users={users} params={params} setParams={setParams} />
    </>
  )
}