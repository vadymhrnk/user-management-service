import React from "react";
import UserList from "./components/UserList/UserList";
import Header from "./components/Header/Header";
import "./App.scss";

const App = () => {
  return (
    <div className="app-container">
      <Header />
      <div className="content-container">
        <UserList />
      </div>
    </div>
  );
};

export default App;
