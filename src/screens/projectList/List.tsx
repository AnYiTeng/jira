import React from "react";
import { IUser, IList } from "./index";

interface IProps {
  users: IUser[];
  list: IList[];
}

export default function List(props: IProps) {
  const { users, list } = props;
  return (
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {list?.map((project) => {
          return (
            <tr key={project.id}>
              <td>{project.name}</td>
              <td>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知 "}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
