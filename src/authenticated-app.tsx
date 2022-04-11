import React from "react";
import ProjectListScreen from "screens/projectList";
import { useAuth } from "context/auth-context";

export const Authenticated = () => {
  const { logout } = useAuth();

  return (
    <div>
      <button onClick={() => logout()}>退出登录</button>
      <ProjectListScreen />
    </div>
  );
};
