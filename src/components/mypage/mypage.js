import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Header from "../layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "./mypage.css";
import hotelimg from "../image/cloud.jpg";
import axios from "axios";

const Mypage = () => {
  const [member, setMember] = useState({
    email: "",
    password: "",
    nickname: "",
    gender: "",
    age: "",
    birth: "",
    authRole: "ROLE_MEMBER",
  });

  const handleValueChange = (e) => {
    //e.preventDefault()
    setMember({ ...member, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(member);
  };
  /////////////////////////////////////////////////////
  useEffect(() => {
    axios.get(`http://localhost:8090/detail/rsvlist`).then((response) => {
      console.log(response.data);
    });
  }, []);

  ////////////////////////////////////////////////////////
  const tapcontent = [
    {
      tab2: "회원정보수정",
      content: (
        <div>
          <div className="JoinImage"></div>
          <div className="JoinForm">
            <h4 className="JoinBold">Join us.</h4>
            <form onSubmit={onSubmit}>
              <input
                type="text"
                placeholder="Email"
                className="JoinNormal"
                name="email"
                onChange={handleValueChange}
              />
              <br />
              <input
                type="password"
                placeholder="Password"
                className="JoinNormal"
                name="password"
                onChange={handleValueChange}
              />
              <br />
              <input
                type="text"
                placeholder="Nickname"
                className="JoinNormal"
                name="nickname"
                onChange={handleValueChange}
              />
              <br />
              <select
                id="SelectBox"
                className="JoinNomal"
                name="gender"
                onChange={handleValueChange}
              >
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <br />
              <select
                id="SelectBox"
                className="JoinNomal"
                name="age"
                onChange={handleValueChange}
              >
                <option value="">Age</option>
                <option value="10">10대</option>
                <option value="20">20대</option>
                <option value="30">30대</option>
                <option value="40">40대</option>
                <option value="50">50대</option>
                <option value="etc">기타</option>
              </select>

              <br />
              <input
                type="date"
                placeholder="Birth"
                className="JoinNormal"
                style={{ fontSize: "13px" }}
                name="birth"
                onChange={handleValueChange}
              />
              <br />
              <br />
              <button className="b-button">SIGN UP</button>
            </form>
          </div>
        </div>
      ),
    },
    {
      tab2: "예약확인",
      content: (
        <div className="reserv_layout">
          <div className="reserv_layout2">
            <div className="reserv_imagelayout">
              <div className="reserv_imagelayout2">
                <img src={hotelimg} />
              </div>
              <div className="reserv_imagetext">
                <h6>예약번호</h6>
                <h6>514-163549333</h6>
              </div>
            </div>
            <div className="reserv_textlayout">
              <div className="reserv_storenamelayout">
                <div className="reserv_storenamelayout1">
                  <h6>숙소명</h6>
                </div>
                <div className="reserv_storenamelayout2">
                  <h6>역삼 카파스</h6>
                </div>
              </div>
              <div className="reserv_textlayout2">
                <div className="reserv_storenamelayout1_1">객실타입</div>
                <div className="reserv_storenamelayout2_1">
                  스탠다드룸 ㅎㅎㅎ
                </div>
                <div className="reserv_storenamelayout2_2">숙박</div>
                <div className="reserv_storenamelayout2_3">59800원</div>
              </div>
              <div className="reserv_textlayout3">
                <div className="reserv_datelayout"> 예약날짜 </div>
                <div className="reserv_datelayout_2">
                  {" "}
                  2023년 3월15일~4월22일
                </div>
              </div>
              <div className="reserv_textlayout4">
                <button>예약취소</button>
              </div>
            </div>
          </div>
          <div className="reserv_layout2">
            <div className="reserv_imagelayout">
              <div className="reserv_imagelayout2">
                <img src={hotelimg} />
              </div>
              <div className="reserv_imagetext">
                <h6>예약번호</h6>
                <h6>514-163549333</h6>
              </div>
            </div>
            <div className="reserv_textlayout">
              <div className="reserv_storenamelayout">
                <div className="reserv_storenamelayout1">
                  <h6>숙소명</h6>
                </div>
                <div className="reserv_storenamelayout2">
                  <h6>역삼 카파스</h6>
                </div>
              </div>
              <div className="reserv_textlayout2">
                <div className="reserv_storenamelayout1_1">객실타입</div>
                <div className="reserv_storenamelayout2_1">
                  스탠다드룸 ㅎㅎㅎ
                </div>
                <div className="reserv_storenamelayout2_2">숙박</div>
                <div className="reserv_storenamelayout2_3">59800원</div>
              </div>
              <div className="reserv_textlayout3">
                <div className="reserv_datelayout"> 예약날짜 </div>
                <div className="reserv_datelayout_2">
                  {" "}
                  2023년 3월15일~4월22일
                </div>
              </div>
              <div className="reserv_textlayout4">
                <button>예약취소</button>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const useTabs = (Tabs, allTabs) => {
    const [contIndex, setcontentIndex] = useState(Tabs);
    return {
      contItem: allTabs[contIndex],
      tabChange: setcontentIndex,
    };
  };

  const { contItem, tabChange } = useTabs(0, tapcontent);

  return (
    <div>
      <Header />
      <div className="JoinPage">
        <div className="buttonRayout">
          <div className="buttonRayout_1">
            <h3>마이페이지</h3>
          </div>
          <div className="buttonRayout_2">
            {tapcontent.map((section2, index) => (
              <Button
                key={section2.tab2}
                onClick={() => tabChange(index)}
                variant="outline-secondary"
              >
                {section2.tab2}
              </Button>
            ))}
          </div>
          <div className="mypagecontentlayout">
            <div>{contItem.content}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
