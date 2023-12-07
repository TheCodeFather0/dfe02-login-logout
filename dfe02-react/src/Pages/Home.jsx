import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const url = "http://localhost:3000/users/";
const Home = ({ user, setUser }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    !user && navigate("/login");
  }, [user]);
  const logoutHandle = () => {
    const isAgree = confirm("deqiq olsun...");
    if (isAgree) {
      localStorage.removeItem("user");
      setUser(false);
    }
  };

  const changeData = (title) => {
    const newData = prompt("yeni datani daxil edin", user[title]);
    let data = {};
    switch (title) {
      case "avatar":
        data = { avatar: newData };
        break;
      case "username":
        data = { username: newData };
        break;
    }
    axios.patch(url + user.id, data).then((res) => {
      if (res.statusText == "OK") {
        axios.get(url).then(({ data }) => {
          data.map((_user, { username, password }) => {
            if (username === username && password === password) {
              localStorage.setItem("user", JSON.stringify(_user));
              setUser(_user);

              alert("deyisdirildi...");
              setShowSettings(false);
              setShowMenu(false);
            }
          });
        });
      }
    });
  };

  return (
    <div>
      <nav>
        <div>
          <img src="https://www.jedacademy.az/front/img/jedlogo.svg" alt="" />
        </div>
        <div
          className="avatar"
          onClick={() => {
            setShowMenu(!showMenu);
            setShowSettings(false);
          }}
        >
          <img src={user.avatar} alt="" />
        </div>
        {showMenu && (
          <div className="userMenu">
            <button onClick={logoutHandle}>Logout</button>
            <button onClick={() => setShowSettings(!showSettings)}>
              Settings
            </button>
            {showSettings && (
              <ul>
                <li>
                  <h3>{user.username}</h3>
                </li>
                <li onClick={() => changeData("username")}>change username</li>
                <li onClick={() => changeData("avatar")}>change image</li>
              </ul>
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Home;
