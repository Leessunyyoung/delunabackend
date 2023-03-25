import Calendar from "./Filterdate";
import Select from "react-select";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Searchbar = (props) => {
  const [loc, setLoc] = useState("");
  const [head, setHead] = useState("");
  const navigate = useNavigate();

  const handleLocChange = (e) => {
    setLoc(e.value);
  };

  const handleHeadChange = (e) => {
    setHead(e.value);
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "#f8f8f8",
      borderColor: state.isFocused ? "#f8f8f8" : "#f8f8f8",
      boxShadow: state.isFocused ? null : null,
      "&:hover": {
        borderColor: state.isFocused ? "#8b8a8a8e" : "#8b8a8a8e",
        borderRadius: "35px",
      },
    }),
  };

  const LocOption = [
    { value: "애월읍", label: "제주시 애월" },
    { value: "한림읍", label: "제주시 한림" },
    { value: "조천읍", label: "제주시 조천" },
    { value: "구좌읍", label: "제주시 구좌" },
    { value: "제주시", label: "제주시 ..." },
    { value: "성산읍", label: "서귀포시 성산" },
    { value: "표선면", label: "서귀포시 표선" },
    { value: "서귀포시", label: "서귀포시 ..." },
  ];

  const HeadCountOption = [
    { value: "1", label: "1명" },
    { value: "2", label: "2명" },
    { value: "3", label: "3명" },
    { value: "4", label: "4명" },
    { value: "5", label: "5명" },
    { value: "10", label: "단체는 업장으로 문의주세요." },
  ];

  return (
    // <form onSubmit={onSubmit}>
    <div className="ViewAllFilter">
      <div className="FilterLoc">
        <div className="LocText">위치</div>
        <Select
          styles={customStyles}
          placeholder="어디로 가시나요?"
          className="LocSelectBox"
          options={LocOption}
          onChange={handleLocChange}
        ></Select>
      </div>

      <Calendar></Calendar>

      <div className="FilterInfo">
        <div id="InfoHeadText">인원수</div>
        <Select
          styles={customStyles}
          placeholder="1명"
          className="HeadSelectBox"
          options={HeadCountOption}
          onChange={handleHeadChange}
        />
      </div>

      <div className="FilterSearch">
        <button
          type="submit"
          onClick={() => {
            navigate("/mainViewAll/0", { state: { loc: loc, head: head } });
          }}
        >
          <img src="/images/search2.png" alt=""></img>
        </button>
      </div>
    </div>
    // </form>
  );
};

export default Searchbar;
