import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../CSS/mypage.css";
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
  const [rsv_dto, setRsv_dto] = useState([]);
  // const [rsv_id, setrsv_id] = useState([]);
  const get_rsv = async (e) => {
    await axios
      .get(
        `http://localhost:8090/detail/rsvlist/${localStorage.getItem(
          "username"
        )}`
      )
      .then((response) => {
        console.log(response.data);
        setRsv_dto(response.data.rsv_dto);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    get_rsv();
  }, []);

  const handleDelete = async (rsvid) => {
    const response = await axios
      .delete(`http://localhost:8090/detail/rsvdelete/${rsvid}`)
      .then((response) => {
        alert("예약이 취소되었습니다.");
        console.log(response.data); // 삭제된 데이터 정보 출력
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  ////////////////////////////////////////////////////////
  const tapcontent = [
    // {
    //   tab2: "회원정보수정",
    //   content: (
    //     <div>
    //       <div className="JoinImage"></div>
    //       <div className="JoinForm">
    //         <h4 className="JoinBold">Join us.</h4>
    //         <form onSubmit={onSubmit}>
    //           <input
    //             type="text"
    //             placeholder="Email"
    //             className="JoinNormal"
    //             name="email"
    //             onChange={handleValueChange}
    //           />
    //           <br />
    //           <input
    //             type="password"
    //             placeholder="Password"
    //             className="JoinNormal"
    //             name="password"
    //             onChange={handleValueChange}
    //           />
    //           <br />
    //           <input
    //             type="text"
    //             placeholder="Nickname"
    //             className="JoinNormal"
    //             name="nickname"
    //             onChange={handleValueChange}
    //           />
    //           <br />
    //           <select
    //             id="SelectBox"
    //             className="JoinNomal"
    //             name="gender"
    //             onChange={handleValueChange}
    //           >
    //             <option value="">Gender</option>
    //             <option value="male">Male</option>
    //             <option value="female">Female</option>
    //           </select>
    //           <br />
    //           <select
    //             id="SelectBox"
    //             className="JoinNomal"
    //             name="age"
    //             onChange={handleValueChange}
    //           >
    //             <option value="">Age</option>
    //             <option value="10">10대</option>
    //             <option value="20">20대</option>
    //             <option value="30">30대</option>
    //             <option value="40">40대</option>
    //             <option value="50">50대</option>
    //             <option value="etc">기타</option>
    //           </select>

    //           <br />
    //           <input
    //             type="date"
    //             placeholder="Birth"
    //             className="JoinNormal"
    //             style={{ fontSize: "13px" }}
    //             name="birth"
    //             onChange={handleValueChange}
    //           />
    //           <br />
    //           <br />
    //           <button className="b-button">수정하기</button>
    //         </form>
    //       </div>
    //     </div>
    //   ),
    // },
    {
      tab2: "예약확인",
      content: (
        <div className="reserv_layout">
          {rsv_dto ? (
            rsv_dto.map((rsvdto, idx) => (
              <div className="reserv_layout2" key={idx}>
                <div className="reserv_imagelayout">
                  <div className="reserv_imagelayout2">
                    <img src={rsvdto.rsv_ac_thumbnail} />
                  </div>
                  <div className="reserv_imagetext">
                    <h6>예약번호 {}</h6>
                    <h6>{rsvdto.rsv_id}</h6>
                  </div>
                </div>
                <div className="reserv_textlayout">
                  <div className="reserv_storenamelayout">
                    <div className="reserv_storenamelayout1">
                      <h6>숙소명</h6>
                    </div>
                    <div className="reserv_storenamelayout2">
                      <h6>{rsvdto.rsv_ac_name}</h6>
                    </div>
                  </div>
                  <div className="reserv_textlayout2">
                    <div className="reserv_storenamelayout1_1">객실타입</div>
                    <div className="reserv_storenamelayout2_1">
                      {rsvdto.rsv_room_name}
                    </div>
                    <div className="reserv_storenamelayout2_2">숙박</div>
                    <div className="reserv_storenamelayout2_3">
                      {rsvdto.rsv_price}
                    </div>
                  </div>
                  <div className="reserv_textlayout3">
                    <div className="reserv_datelayout"> 예약날짜 </div>
                    <div className="reserv_datelayout_2">
                      {rsvdto.rsv_start.split(/[ \[\]]+/)[0]}~
                      {rsvdto.rsv_end.split(/[ \[\]]+/)[0]}
                    </div>
                  </div>
                  <div className="reserv_textlayout4">
                    <button onClick={() => handleDelete(rsvdto.rsv_id)}>
                      예약취소
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>현재 예약된 숙소가 존재하지 않습니다.</div>
          )}
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
