import React, { useState, useEffect } from "react";
import { cleanObject, useMount, useDebounce } from "utils";
import List from "./List";
import SearchPanel from "./SearchPanel";
import qs from "qs";

const apiUrl = process.env.REACT_APP_API_URL;

export interface IUser {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
}

export interface IList {
  id: string;
  name: string;
  personId: string;
}

export default function ProjectListScreen() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [params, setParams] = useState({
    name: "",
    personId: "",
  });
  const [list, setList] = useState<IList[]>([]);
  const debounceParams = useDebounce(params, 500);

  useEffect(() => {
    fetch(
      `${apiUrl}/projects?${qs.stringify(cleanObject(debounceParams))}`
    ).then(async (response) => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [debounceParams]);

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  });

  return (
    <>
      <List users={users} list={list} />
      <SearchPanel users={users} params={params} setParams={setParams} />
    </>
  );
}
