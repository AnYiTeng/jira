import React, { useState } from "react";
import { IUser } from "./index";

interface IProps {
  users: IUser[];
  params: {
    name: string;
    personId: string;
  };
  setParams: (T: IProps["params"]) => void;
}

export default function SearchPanel(props: IProps) {
  const { users, params, setParams } = props;

  return (
    <form>
      <div>
        <input
          type="text"
          value={params?.name}
          onChange={(e) =>
            setParams({
              ...params,
              name: e.target.value,
            })
          }
        />
        <select
          value={params?.personId}
          onChange={(e) =>
            setParams({
              ...params,
              personId: e.target.value,
            })
          }
        >
          <option value={""}>负责人</option>
          {users?.map((user) => {
            return (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            );
          })}
        </select>
      </div>
    </form>
  );
}
