import React, { useState } from "react"

export default function SearchPanel({users, params, setParams}) {
  return (
    <form>
      <div>
        <input
          type="text"
          value={params?.name}
          onChange={(e) => setParams({
            ...params,
            name: e.target.value,
          })}
        />
        <select
          value={params?.personId}
          onChange={(e) => setParams({
            ...params,
            personId: e.target.value,
          })}
        >
          <option value={''}>负责人</option>
          {
            users?.map(user => {
              return <option key={user.id} value={user.id}>{user.name}</option>
            })
          }
        </select>
      </div>
    </form>
  )
}