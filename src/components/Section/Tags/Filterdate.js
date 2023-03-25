import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";

const Filterdate = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  return (
    <div className="FilterDate">
      <div id="CheckInOutText">
        <div id="CheckInText">체크인</div>
        <div id="CheckOutText">체크아웃</div>
      </div>
      <div className="DatePickerContainer">
        <DatePicker
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          onChange={(update) => {
            setDateRange(update);
          }}
          locale={ko}
          dateFormat="yyyy.MM.dd (eee)"
          isClearable={true}
          minDate={new Date()}
          placeholderText="---- 체크인 ---- &nbsp;---- 체크아웃 ---- "
          id="DatePicker"
        />
      </div>
    </div>
  );
};

export default Filterdate;
