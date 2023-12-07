import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import "./style.css";

const App = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || false
  );
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home user={user} setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
      </Routes>
    </div>
  );
};

export default App;
