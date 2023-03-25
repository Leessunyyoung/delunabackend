import { useState } from "react";

const Checkbox = (props) => {
  let copyHotels = props.copyHotels; //부모 컴포넌트에서 가져온 hotels 데이터
  let tags = props.tags;
  let changeHotels = []; //데이터가 가공되는 과정 중엔 이곳에 저장됨. 가공이 끝난 데이터는 sendHotels함수를 호출하여 부모로 전달

  //체크박스의 체크 여부를 상태관리 하기 위한 선언
  const [isChecked, setIsChecked] = useState(false);

  //총 체크된 item들을 확인하기 위한 상태관리
  const [checkedItems, setCheckedItems] = useState([]);
  let items = [];

  //체크박스 클릭시 이벤트 발생 -> isChecked의 값을 수정하고 value를 가져와 checkedItemHandler에 넘겨줌
  const checkedHandler2 = ({ target }) => {
    setIsChecked(!isChecked);
    checkedItemHandler2(target.value, target.checked);
  };

  //숙소타입필터
  const checkedItemHandler2 = (id, isChecked) => {
    //넘겨준 체크여부와 value를 넘겨받아 체크가 된 상태일때 / 해제했을때 실행할 내용을 작성
    if (isChecked) {
      //체크할때 실행할 부분
      items = [id, ...checkedItems]; //items 배열에 체크된 id를 저장
      setCheckedItems(items); //CheckedItems 에 set 해줌
      // *** item배열에 저장하여 이중으로 작업하지 않고, setCheckedItems(id, ...checkedItems)와 같은식으로 진행할 경우,
      // *** set 되어 저장되는 작업이 이벤트 처리 함수보다 늦어 checkedItems의 값이 바뀌기전에 아래의 함수가 실행되는 버그가 발생(아직 원인불명)
      // *** item배열에 저장한뒤 상태값을 바꾸는 방식으로 위와같이 진행하면 현재 문제 없음

      items.map(
        (
          check //체크된 id가 모두 담긴 items배열을 반복하여 체크한다.
        ) => {
          if (
            parseInt(check) === 1 ||
            parseInt(check) === 2 ||
            parseInt(check) === 3 ||
            parseInt(check) === 4
          ) {
            copyHotels.map(
              //초기 원본데이터(copyHotels)에서 반복하여
              (hotels) =>
                hotels.ac_type_number === parseInt(check) //id를 비교하여 일치하는 값만
                  ? changeHotels.push(hotels) //임시 저장소에 저장함
                  : null
            );
          } else if (parseInt(check) === 5) {
            copyHotels.map((hotels) =>
              hotels.ac_latitude < 126.7 &&
              hotels.ac_latitude > 126.3 &&
              hotels.ac_longitude < 33.55 &&
              hotels.ac_longitude > 33.42
                ? changeHotels.push(hotels) //임시 저장소에 저장함
                : null
            );
          } else if (parseInt(check) === 6) {
            copyHotels.map((hotels) =>
              hotels.ac_latitude < 126.7 &&
              hotels.ac_latitude > 126.3 &&
              hotels.ac_longitude < 33.42 &&
              hotels.ac_longitude > 33.24
                ? changeHotels.push(hotels) //임시 저장소에 저장함
                : null
            );
          } else if (parseInt(check) === 7) {
            copyHotels.map((hotels) =>
              hotels.ac_latitude < 126.97 &&
              hotels.ac_latitude > 126.75 &&
              hotels.ac_longitude < 33.5 &&
              hotels.ac_longitude > 33.38
                ? changeHotels.push(hotels) //임시 저장소에 저장함
                : null
            );
          } else if (parseInt(check) === 8) {
            copyHotels.map((hotels) =>
              hotels.ac_latitude < 126.33 &&
              hotels.ac_latitude > 126.13 &&
              hotels.ac_longitude < 33.5 &&
              hotels.ac_longitude > 33.21
                ? changeHotels.push(hotels) //임시 저장소에 저장함
                : null
            );
          } else if (
            check === "주차가능" ||
            check === "수화물보관" ||
            check === "객실금연" ||
            check === "조식운영(뷔페)"
          ) {
            tags.map(
              //초기 원본데이터(copyHotels)에서 반복하여
              (tags) =>
                tags.ac_serv_desc === check //id를 비교하여 일치하는 값만
                  ? copyHotels.map((hotels) =>
                      tags.ac_id === hotels.ac_id
                        ? changeHotels.push(hotels)
                        : null
                    ) //임시 저장소에 저장함
                  : null
            );
          }
          return id;
        }
      );
      const result = changeHotels.reduce((acc, v) => {
        return acc.includes(v) ? acc : [...acc, v];
      }, []);
      sendHotels(result); //가공이 완료된 changeHotels데이터를 hotels에 set하여 view를 바꿈.
    } else if (!isChecked) {
      //체크를 해제할때 실행할 부분
      items = checkedItems.filter((item) => item !== id); //필터링하여 받아온 id만 제외하고 저장
      setCheckedItems(items);
      console.log(items);
      if (items.length > 0) {
        //해제 후에도 체크된 박스가 남아있는 경우
        items.map(
          (
            check //체크된 id가 모두 담긴 items배열을 반복하여 체크한다.
          ) => {
            if (
              parseInt(check) === 1 ||
              parseInt(check) === 2 ||
              parseInt(check) === 3 ||
              parseInt(check) === 4
            ) {
              copyHotels.map(
                //초기 원본데이터(copyHotels)에서 반복하여
                (hotels) =>
                  hotels.ac_type_number === parseInt(check) //id를 비교하여 일치하는 값만
                    ? changeHotels.push(hotels) //임시 저장소에 저장함
                    : null
              );
            } else if (parseInt(check) === 5) {
              copyHotels.map((hotels) =>
                hotels.ac_latitude < 126.7 &&
                hotels.ac_latitude > 126.3 &&
                hotels.ac_longitude < 33.55 &&
                hotels.ac_longitude > 33.42
                  ? changeHotels.push(hotels) //임시 저장소에 저장함
                  : null
              );
            } else if (parseInt(check) === 6) {
              copyHotels.map((hotels) =>
                hotels.ac_latitude < 126.7 &&
                hotels.ac_latitude > 126.3 &&
                hotels.ac_longitude < 33.42 &&
                hotels.ac_longitude > 33.24
                  ? changeHotels.push(hotels) //임시 저장소에 저장함
                  : null
              );
            } else if (parseInt(check) === 7) {
              copyHotels.map((hotels) =>
                hotels.ac_latitude < 126.97 &&
                hotels.ac_latitude > 126.75 &&
                hotels.ac_longitude < 33.5 &&
                hotels.ac_longitude > 33.38
                  ? changeHotels.push(hotels) //임시 저장소에 저장함
                  : null
              );
            } else if (parseInt(check) === 8) {
              copyHotels.map((hotels) =>
                hotels.ac_latitude < 126.33 &&
                hotels.ac_latitude > 126.13 &&
                hotels.ac_longitude < 33.5 &&
                hotels.ac_longitude > 33.21
                  ? changeHotels.push(hotels) //임시 저장소에 저장함
                  : null
              );
            } else if (
              check === "주차가능" ||
              check === "수화물보관" ||
              check === "객실금연" ||
              check === "조식운영(뷔페)"
            ) {
              tags.map(
                //초기 원본데이터(copyHotels)에서 반복하여
                (tags) =>
                  tags.ac_serv_desc === check //id를 비교하여 일치하는 값만
                    ? copyHotels.map((hotels) =>
                        tags.ac_id === hotels.ac_id
                          ? changeHotels.push(hotels)
                          : null
                      ) //임시 저장소에 저장함
                    : null
              );
            }
            return items;
          }
        );
        sendHotels(changeHotels); //가공이 완료된 changeHotels데이터를 hotels에 set하여 view를 바꿈.
      } else {
        //해제한 박스가 마지막 박스일경우 (초기화면과 같을 경우)
        sendHotels(copyHotels); //초기데이터를 set하여 준다.
      }
    }

    return checkedItems;
  };

  const sendHotels = (hotels) => {
    //부모컴포넌트로 hotels의 값을 돌려줌
    props.getHotels(hotels);
  };

  return (
    <div className="ViewAllCheckBox">
      {/* <div className="CheckBoxContainer"> */}
        {/* <h4>평점 필터</h4> */}
        {/* <div className="CheckBoxItems">
          <p>4.5 ~ 5.0</p>
          <input type="checkbox" className="CheckBox" />
          <p>4.0 ~ 4.5</p>
          <input type="checkbox" className="CheckBox" />
          <p>3.5 ~ 4.0</p>
          <input type="checkbox" className="CheckBox" />
          <p>3.0 ~ 3.5</p>
          <input type="checkbox" className="CheckBox" />
        </div> */}
      {/* </div> */}
      <div className="CheckBoxContainer">
        <h4>시설 유형</h4>
        <div className="CheckBoxItems">
          <p>호텔</p>
          <input
            type="checkbox"
            value={2}
            className="CheckBox"
            onChange={(e) => checkedHandler2(e)}
          />
          <p>모텔</p>
          <input
            type="checkbox"
            value={1}
            className="CheckBox"
            onChange={(e) => checkedHandler2(e)}
          />
          <p>팬션</p>
          <input
            type="checkbox"
            value={3}
            className="CheckBox"
            onChange={(e) => checkedHandler2(e)}
          />
          <p>게스트하우스</p>
          <input
            type="checkbox"
            value={4}
            className="CheckBox"
            onChange={(e) => checkedHandler2(e)}
          />
        </div>
      </div>
      <div className="CheckBoxContainer">
        <h4>위치</h4>
        <div className="CheckBoxItems">
          <p>북부</p>
          <input
            type="checkbox"
            className="CheckBox"
            value={5}
            onChange={(e) => checkedHandler2(e)}
          />
          <p>남부</p>
          <input
            type="checkbox"
            className="CheckBox"
            value={6}
            onChange={(e) => checkedHandler2(e)}
          />
          <p>동부</p>
          <input
            type="checkbox"
            className="CheckBox"
            value={7}
            onChange={(e) => checkedHandler2(e)}
          />
          <p>서부</p>
          <input
            type="checkbox"
            className="CheckBox"
            value={8}
            onChange={(e) => checkedHandler2(e)}
          />
        </div>
      </div>
      <div className="CheckBoxContainer">
        <h4>추천 필터</h4>
        <div className="CheckBoxItems">
          <p>주차가능</p>
          <input
            type="checkbox"
            className="CheckBox"
            value={"주차가능"}
            onChange={(e) => checkedHandler2(e)}
          />
          <p>수화물보관</p>
          <input
            type="checkbox"
            className="CheckBox"
            value={"수화물보관"}
            onChange={(e) => checkedHandler2(e)}
          />
          <p>금연</p>
          <input
            type="checkbox"
            className="CheckBox"
            value={"객실금연"}
            onChange={(e) => checkedHandler2(e)}
          />
          <p>조식운영</p>
          <input
            type="checkbox"
            className="CheckBox"
            value={"조식운영(뷔페)"}
            onChange={(e) => checkedHandler2(e)}
          />
        </div>
      </div>
    </div>
  );
};

export default Checkbox;
