import './modal2.css';
import personimage from '../../images/teamwork.png';
import priceimage from '../../images/money-banking.png';
import calendarimage from '../../images/calendar.png';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Modal = (props) => {
  const gr_dto = props.gr_dto;
  const ac_dto = props.ac_dto;
  console.log(ac_dto);

  const [inputUserName, setInputUserName] = useState(
    localStorage.getItem('username')
  );

  const onSubmit = async (e) => {
    e.preventDefault(); //빼면은 자동으로 새로고침이된다.

    const data = {
      ac_id: ac_dto.ac_id,
      username: localStorage.getItem('username'),
      rsv_ac_name: ac_dto.ac_name,
      rsv_user_max: props.selectedGrpersonmax,
      rsv_user_min: props.selectedGrpersonmin,
      rsv_room_name: props.selectedGrName,
      rsv_price: props.selectedGrPrice,
      rsv_check_in: ac_dto.ac_check_in,
      rsv_check_out: ac_dto.ac_check_out,
      rsv_start: props.formatDate(props.startDate),
      rsv_end: props.formatDate(props.endDate),
      rsv_ac_thumbnail: ac_dto.ac_thumbnail,
    };

    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    await axios
      .post(
        `http://localhost:8090/detail/rsvinsert`,
        JSON.stringify(data),
        config
      )
      .then((response) => {
        props.onClose();
        alert('예약이 완료되었습니다.');
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //현재날짜
  const currentDate = new Date();
  return (
    <form onSubmit={onSubmit}>
      <div className='modaldallayout'>
        <div className='modal-content_1'>
          <h2>예약확인</h2>
        </div>
        <div className='modal-content2'>
          <h3>
            {currentDate.getFullYear() +
              `년` +
              (currentDate.getMonth() + 1) +
              `월` +
              currentDate.getDate() +
              `일 `}
          </h3>
          <h4 className='h4_1'>514-163549</h4>
          <h4 className='h4_2'>예약번호</h4>
        </div>
        <div className='left_right_layout'>
          <div className='left_photolayout'>
            <div className='gakphoto'>
              <img src={ac_dto.ac_thumbnail} />
            </div>
            <div className='gaknamelayout'>
              <div className='gaknamelayout_1'>
                <h3>{ac_dto.ac_name}</h3>
              </div>
              <div className='gaknamelayout_2'>
                <h4>객실타입</h4>
                <h3>{props.selectedGrName}</h3>
              </div>
            </div>
          </div>

          <div className='right_gaklayout'>
            <div className='right_gaklayout2'>
              <div className='right_gakname'>
                <div className='right_gakname_1'>
                  <img src={personimage} />
                </div>
                <div className='right_gakname_2'>
                  <h3>성함</h3>
                </div>
                <div className='right_gakname_3'>
                  <h3>{localStorage.getItem('username')}</h3>
                </div>
              </div>
              <div className='right_gakprice'>
                <div className='right_gakprice_1'>
                  <img src={priceimage} />
                </div>
                <div className='right_pakprice_2'>
                  <h3>숙박가격</h3>
                </div>
                <div className='right_pakprice_3'>
                  <h3>{props.selectedGrPrice}</h3>
                </div>
              </div>
              <div className='right_date'>
                <div className='right_gaklayout3_img'>
                  <img src={calendarimage} />
                </div>
                <div className='right_gakstartdate'>
                  <h3>체크인</h3>
                </div>
                <div className='right_gakenddate'>
                  <h3>{props.formatDate(props.startDate)}</h3>
                </div>
              </div>
              <div className='right_date2'>
                <div className='right_gakstartdate2'>
                  <h3>체크아웃</h3>
                </div>
                <div className='right_gakenddate3'>
                  <h3>{props.formatDate(props.endDate)}</h3>
                </div>
              </div>
              <div className='gakbutton'>
                <button onClick={props.onClose}>취소</button>
                <button type='submit'>예약확인</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Modal;
