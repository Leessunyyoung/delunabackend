import axios from "axios";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { baseUrl } from "../../commonApi/baseApi";
import "../../CSS/Login.css";

const Login = () => {
  const navigator = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUserNameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let data = { username: username, password: password };
    await axios
      .post(`${baseUrl}/login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        let jwtToken = response.headers["authorization"];
        let jwtUsername = response.data.username;
        console.log("jwtToken", jwtToken);
        localStorage.setItem("Authorization", jwtToken);
        localStorage.setItem("username", jwtUsername);
        setUsername("");
        setPassword("");
      })
      .then((response) => {
        navigator("/");
        window.location.replace("/");
      })
      .catch((err) => {
        alert("회원정보가 일치하지 않습니다.");
        window.location.reload();
      });
  };

  return (
    <div className="LoginPage">
      <div className="LoginContainer">
        <div className="LoginImage"></div>
        <div className="Loginform">
          <h4 className="LoginBold">Welcome to Delluna.</h4>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="username"
              className="LoginNormal"
              name="username"
              onChange={handleUserNameChange}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              className="LoginNormal"
              name="password"
              onChange={handlePasswordChange}
            />
            <br />
            <button type="submit" className="b-button">
              SIGN IN
            </button>
          </form>
          <br />
          <hr></hr>

          <button id="LoginJoinButton">
            <NavLink to="/join" id="LoginJoinButton">
              Join us
            </NavLink>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
