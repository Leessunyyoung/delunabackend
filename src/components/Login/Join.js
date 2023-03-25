import axios from "axios";
import React, { useState } from "react";
import { baseUrl } from "../../commonApi/baseApi";
import { Link, useNavigate } from "react-router-dom";
import "../../CSS/Join.css";

function Join() {
  const navigator = useNavigate();

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [authRole, setAuthRole] = useState("ROLE_USER");

  const [userNameError, setUserNameError] = useState(false);
  const [userNameDuplicateError, setUserDuplicateError] = useState(true);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [nicknameError, setNicknameError] = useState(false);
  const [nicknameDuplicateError, setNicknameDuplicateError] = useState(true);
  const [emailError, setEmailError] = useState(false);
  const [emailDuplicateError, setEmailDuplicateError] = useState(true);

  const onChangeUserName = async (e) => {
    const userIdRegex = /^[A-Za-z0-9]{2,}$/;
    setUserName(e.target.value);
    if (!userIdRegex.test(username)) {
      setUserNameError(true);
    } else {
      setUserNameError(false);
    }
  };
  const onChangePassword = (e) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/;
    setPassword(e.target.value);
    if (!password || passwordRegex.test(password)) setPasswordError(false);
    else setPasswordError(true);

    if (!confirmPassword || password === confirmPassword)
      setConfirmPasswordError(false);
    else setConfirmPasswordError(true);
  };
  const onChangeConfirmPassword = (e) => {
    if (password === e.target.value) setConfirmPasswordError(false);
    else setConfirmPasswordError(true);
    setConfirmPassword(e.target.value);
  };
  const onChangeNickname = (e) => {
    const nicknameRegex = /^[A-Za-z0-9]{2,}$/;
    setNickname(e.target.value);
    if (!nicknameRegex.test(nickname)) {
      setNicknameError(true);
    } else {
      setNicknameError(false);
    }
  };
  const onChangeEmail = (e) => {
    const emailRegex =/^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    setEmail(e.target.value);
    if (!email || emailRegex.test(email)) setEmailError(false);
    else setEmailError(true);
  };

  const onClickCheckId = async (e) => {
    e.preventDefault();
    const userIdRegex = /^[A-Za-z0-9]{2,}$/;
    if (userIdRegex.test(username)) {
      const form = new FormData();
      form.append("username", username);
      await axios
        .post(`${baseUrl}/join/checkid`, form)
        .then((res) => {
          console.log(res.data);
          setUserDuplicateError(res.data);
          if (res.data === true) {
            alert("중복된 아이디가 존재합니다.");
          } else {
            alert("사용 가능한 아이디입니다.");
          }
        })
        .catch((err) => {
          alert("중복 체크 중 오류가 발생했습니다.");
          setUserDuplicateError(false);
        });
    } else {
      alert(
        "사용자 ID는 3자 이상이어야 하며 문자 또는 숫자를 포함해야 합니다."
      );
      setUserNameError(true);
    }
  };

  const onClickCheckNickname = async (e) => {
    e.preventDefault();
    const nicknameRegex = /^[A-Za-z0-9]{2,}$/;
    if (nicknameRegex.test(nickname)) {
      const form = new FormData();
      form.append("nickname", nickname);
      await axios
        .post(`${baseUrl}/join/checknick`, form)
        .then((res) => {
          // alert(res.data);
          setNicknameDuplicateError(res.data);
          if (res.data === true) {
            alert("중복된 닉네임이 존재합니다.");
          } else {
            alert("사용 가능한 닉네임입니다.");
          }
        })
        .catch((err) => {
          alert("중복 체크 중 오류가 발생했습니다.");
          setNicknameDuplicateError(false);
        });
    } else {
      alert("닉네임은 3자 이상이어야 하며 문자 또는 숫자를 포함해야 합니다.");
    }
  };

  const onClickCheckEmail = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("email", email);
    await axios
      .post(`${baseUrl}/join/checkemail`, form)
      .then((res) => {
        // alert(res.data);
        setEmailDuplicateError(res.data);
        if (res.data === true) {
          alert("중복된 이메일이 존재합니다.");
        } else {
          alert("사용 가능한 이메일입니다.");
        }
      })
      .catch((err) => {
        alert("중복 체크 중 오류가 발생했습니다.");
        setEmailDuplicateError(false);
      });
  };

  const onClickAuthButton = (e) => {
    // console.log("authcheck : " + e.target.id);
    setAuthRole(e.target.id);
  };

  const validation = () => {
    if (
      !userNameError &&
      !userNameDuplicateError &&
      !passwordError &&
      !nicknameError &&
      !nicknameDuplicateError &&
      !emailError &&
      !emailDuplicateError
    )
      return true;
    else {
      if (!username) setUserNameError(true);
      if (!password) setPasswordError(true);
      if (!confirmPassword) setConfirmPasswordError(true);
      if (!nickname) setNicknameError(true);
      if (!email) setEmailError(true);
      return false;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!username) {
      alert("아이디를 확인해주세요.");
    } else if (userNameDuplicateError) {
      alert("아이디 중복확인을 해주세요.");
    } else if (!password) {
      alert("비밀번호를 확인해주세요.");
    } else if (!nickname) {
      alert("닉네임을 확인해주세요.");
    } else if (nicknameDuplicateError) {
      alert("닉네임 중복확인을 해주세요.");
    } else if (!email) {
      alert("이메일을 확인해주세요.");
    } else if (emailDuplicateError) {
      alert("이메일 중복확인을 해주세요.");
    } else if (validation() === true) {
      const data = {};
      Object.assign(data, {
        username,
        password,
        email,
        nickname,
        authRole,
      });
      await axios
        .post(`${baseUrl}/join`, data)
        .then((res) => {
          console.log(res);
          navigator(-1);
          alert("회원가입이 완료되었습니다.");
        })
        .catch((err) => {
          throw new Error(err);
        });
    }

    // API Call
  };

  return (
    <div>
      {" "}
      <div className="JoinPage">
        <div className="JoinContainer">
          <div className="JoinImage"></div>

          <form onSubmit={onSubmit} className="JoinForm">
            <h4 className="JoinBold">Join us.</h4>
            <div>
              <input
                type="Username"
                onChange={onChangeUserName}
                // onBlur={onChangeUserName}
                value={username}
                maxLength={20}
                placeholder="아이디 입력"
              />
              <button
                type="button"
                name="onClickCheckId"
                onClick={onClickCheckId}
                className="JoinCheckBtn"
              >
                중복확인
              </button>
              {userNameError && (
                <div className="invalid-input">
                  사용자 ID는 3자 이상이어야 하며 문자 또는 숫자를 포함해야
                  합니다.
                </div>
              )}
            </div>
            <div>
              <input
                className="pw"
                type="Password"
                onChange={onChangePassword}
                value={password}
                maxLength={20}
                placeholder="비밀번호 입력"
              />
              {passwordError && (
                <div className="invalid-input">
                  비밀번호는 8자 이상이어야 하며 하나 이상의 문자와 숫자 하나를
                  포함해야 합니다.{" "}
                </div>
              )}
            </div>
            <div>
              <input
                className="pw"
                type="Password"
                onChange={onChangeConfirmPassword}
                value={confirmPassword}
                maxLength={20}
                placeholder="비밀번호 확인"
              />
              {confirmPasswordError && (
                <div className="invalid-input">
                  비밀번호가 일치하지 않습니다.
                </div>
              )}
            </div>
            <div>
              <input
                type="text"
                onChange={onChangeNickname}
                value={nickname}
                maxLength={20}
                placeholder="닉네임 입력"
              />
              <button
                type="button"
                name="onClickCheckNickname"
                onClick={onClickCheckNickname}
                className="JoinCheckBtn"
              >
                중복확인
              </button>
              {nicknameError && (
                <div className="invalid-input">
                  닉네임은 3자 이상이어야 하며 문자 또는 숫자를 포함해야 합니다.
                </div>
              )}
            </div>
            <div>
              <input
                type="text"
                onChange={onChangeEmail}
                value={email}
                maxLength={50}
                placeholder="이메일 입력"
              />
              <button
                type="button"
                name="onClickCheckEmail"
                onClick={onClickCheckEmail}
                className="JoinCheckBtn"
              >
                중복확인
              </button>
              {emailError && (
                <div className="invalid-input">
                  유효한 이메일 형식을 입력하십시오.
                </div>
              )}
            </div>
            <div className="JoinRadio">
              <input
                type="radio"
                id="ROLE_USER"
                name="authrole"
                value="ROLE_USER"
                defaultChecked="defaultChecked"
                onClick={onClickAuthButton}
              />
              <label htmlFor="ROLE_USER">일반사용자</label>

              <input
                type="radio"
                id="ROLE_ADMIN"
                name="authrole"
                value="ROLE_ADMIN"
                onClick={onClickAuthButton}
              />
              <label htmlFor="authChoice2">관리자</label>
            </div>
            <div>
              <button className="b-button" type="submit">
                Sign Up
              </button>
            </div>
            <span className="text">
              Have an account?{" "}
              <Link to="/login" className="link">
                Sign In
              </Link>
            </span>
          </form>
        </div>{" "}
      </div>
    </div>
  );
}

export default Join;
