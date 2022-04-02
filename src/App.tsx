import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ProjectListScreen from "./screens/projectList/index";
import LoginView from "screens/login";

function App() {
  return (
    <div className="App">
      {/* <ProjectListScreen /> */}
      <LoginView />
    </div>
  );
}

export default App;
