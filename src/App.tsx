import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ProjectListScreen from "./screens/projectList/index";
// import Test from "screens/Test";

function App() {
  return (
    <div className="App">
      <ProjectListScreen />
      {/* <Test /> */}
    </div>
  );
}

export default App;
