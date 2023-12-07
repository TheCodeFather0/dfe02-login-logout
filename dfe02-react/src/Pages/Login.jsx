import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const url = "http://localhost:3000/users";
const Login = ({ setUser }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandle = (e) => {
    e.preventDefault();
    axios.get(url).then(({ data }) => {
      data.map((user) => {
        if (user.username === username && user.password === password) {
          setUser(user);
          localStorage.setItem("user", JSON.stringify(user));
          navigate("/");
        } else {
          alert("istifadeci adi ve ya sifre yalnisdir...");
        }
      });
      setUserName("");
      setPassword("");
    });
  };
  return (
    <div>
      <form onSubmit={submitHandle}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
