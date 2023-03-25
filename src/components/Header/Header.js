import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../../CSS/Header.css";

const Header = () => {
  return (
    <div className="Header">
      <div className="HeaderLogin">
        {localStorage.getItem("username") === null ? (
          <>
            <li>
              <NavLink to="/login" id="LoginButtonText">
                로그인
              </NavLink>
            </li>
            <li>
              <NavLink to="/join" id="LoginButtonText">
                회원가입
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/logout" id="LoginButtonText">
                로그아웃
              </NavLink>
            </li>
            <li>
              <NavLink to="/mypage" id="LoginButtonText">
                마이페이지
              </NavLink>
            </li>
          </>
        )}
        {/* <li>
          <button id="LoginButton">
            <NavLink to="/login" id="LoginButtonText">
              Login
            </NavLink>
          </button>
        </li>
        <li>
          <NavLink to="/join">회원가입</NavLink>
        </li>
        <li>
          <NavLink to="/mypage">마이페이지</NavLink>
        </li> */}
      </div>

      <NavLink to="/" id="">
        <img src="/images/logo.png" id="LogoImage" alt="" />
      </NavLink>
    </div>
  );
};

export default Header;
