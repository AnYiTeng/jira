import React from "react";
import logo from "./logo.svg";
import { UnAuthenticated } from "unauthenticated-app";
import { Authenticated } from "authenticated-app";
import { useAuth } from "context/auth-context";
import "./App.css";

function App() {
  const { user } = useAuth();

  return (
    <div className="App">{user ? <Authenticated /> : <UnAuthenticated />}</div>
  );
}

export default App;
