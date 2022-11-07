import "./App.css";
import React from "react";
import UserContextProvider from "./Context/UserContextProvider";
import User from "./components/User";

function App() {
  return (
    <UserContextProvider>
      <User />
    </UserContextProvider>
  );
}

export default App;
