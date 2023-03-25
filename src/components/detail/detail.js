import './detail.css';
import moment from 'moment';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Detail_1 from './detail_1';
import Detail_3 from './detail_3';
import Detail_4 from './detail_4';
import { Dropdown } from 'react-bootstrap';
import './ReviewDetail.css';
import Rating from './Rating';
import Modal from '../Modal/modal2';
import Footer from '../Footer/footer';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Detail_tag from './detail_tag';

const Detail = () => {
  const ARRAY = [0, 1, 2, 3, 4];

  // //캘린터
  // const [selectedDate,setselectedDate] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const onChange = (dates) => {
    const [start, end] = dates;
    // setselectedDate(start);
    setStartDate(start);
    setEndDate(end);
  };
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  };

  //현재날짜
  const currentDate = new Date();

  //드롭다운 useState,useRef
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);

  //드롭다운 li를 클릭했을때 밑에 div에 이름,가격 선택하기위한 useState
  const [selectedGrName, setSelectedGrName] = useState('');
  const [selectedGrPrice, setSelectedGrPrice] = useState('');
  const [selectedGrpersonmax, setSelectedGrpersonmax] = useState('');
  const [selectedGrpersonmin, setSelectedGrpersonmin] = useState('');

  const handleClick = () => {
    setVisible(!visible);
    // alert("예약날짜에 겹치는 객실이 있으면 빠집니다");
  };
  //드롭다운 onclick
  const divChange = (e) => {
    setVisible2(true);
    const grName = e.target.textContent;
    setSelectedGrName(grName);
    const item = gr_dto2.find((e) => e.gr_name === grName);
    //modal.js로 넘기기위한 인원최대
    const personmax = e != null ? item.gr_person_max : '알수없음';
    //modal.js로 넘기기위한 인원최소
    const personmin = e != null ? item.gr_person_min : '알수없음';
    setSelectedGrpersonmax(personmax);
    setSelectedGrpersonmin(personmin);
    setSelectedGrPrice(item.gr_price);
  };
  //팝업으로 모달창 띄우기
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = async () => {
    if (!startDate || !endDate) {
      alert('예약날짜를 선택해주세요');
      return;
    }
    if (!visible2) {
      alert('객실을 선택해주세요');
      return;
    }
    setIsModalOpen(true);
  };
  const handleCloseModal = () => setIsModalOpen(false);

  const ac_id = useParams().ac_id;
  const [ac_dto, setAc_dto] = useState([]);
  const [ac_serv_dto, setAc_serv_dto] = useState([]);
  const [gr_dto2, setGr_dto2] = useState([]);
  const [rsv_dto, setRsv_dto] = useState([]);
  const get_rsv = async (e) => {
    await axios
      .get(`http://localhost:8090/detail/rsvlist`)
      .then((res) => {
        console.log(res.data.rsv_dto);
        setRsv_dto(res.data.rsv_dto);
      })
      .catch((err) => {
        console.log(err);
        setRsv_dto([]);
      });
  };

  useEffect(() => {
    console.log(gr_dto2);
  }, [gr_dto2]);

  //탭전환
  const content = [
    {
      tab: '객실선택',
      contents: <Detail_1 gr_dto2={gr_dto2} />,
    },
    {
      tab: '숙소정책',
      contents: <Detail_3 ac_dto={ac_dto} />,
    },
    {
      tab: '위치',
      contents: <Detail_4 ac_dto={ac_dto} />,
    },
  ];

  // allTabs = content
  const useTabs = (initialTabs, allTabs) => {
    const [contentIndex, setContentIndex] = useState(initialTabs);
    return {
      contentItem: allTabs[contentIndex], //전체 content 가져오기
      contentChange: setContentIndex,
    };
  };

  const { contentItem, contentChange } = useTabs(0, content);
  //탭전환끝

  useEffect(
    (e) => {
      const get_ac_info = async () => {
        await axios
          .get(`http://localhost:8090/detail/${ac_id}`)
          .then((res) => {
            // console.log(res.data.ac_dto);
            // console.log(res.data.ac_serv_dto);
            setAc_dto(res.data.ac_dto);
            setAc_serv_dto(res.data.ac_serv_dto);
            const uniqueGrIds = new Set();
            const filteredGrDtos = res.data.gr_dto2.filter((dto) => {
              const isDuplicate = uniqueGrIds.has(dto.gr_id); // 중복된 gr_id가 있는지 확인
              uniqueGrIds.add(dto.gr_id); // Set 객체에 gr_id 추가
              return !isDuplicate; // 중복된 dto는 필터링해서 제외
            });

            const newData = filteredGrDtos.map((item) => {
              const gr_price = parseInt(item.gr_price.replace(/[^0-9]/g, ''));
              const month = startDate.getMonth();
              console.log(month);
              let updated_gr_price = gr_price;
              if(month>=2 && month<=5){
                updated_gr_price += parseInt(0);
                console.log(updated_gr_price);
              }else if(month>=6 && month <=11){
                updated_gr_price+=parseInt(20000);
                console.log(updated_gr_price);
              }
              return { ...item,gr_price:updated_gr_price};
            });
            setGr_dto2(newData);
          })
          .catch((err) => {
            console.log(err);
            setAc_dto([]);
            setAc_serv_dto([]);
          });
      };
      get_ac_info();
    },
    [startDate]
  );

  useEffect((e) => {
    get_rsv();
  }, []);

  //시작날짜와 끝날짜를 axios로 가져와 그사이에 숫자를 split처리해서 배치함
  //드롭다운에 쓰기위해서 axios에서 받아온 객실이름만 설정
  const [grdtoName, setGrdtoName] = useState([]);
  //rsv_dto에서 이름과 날짜를 뽑기위해
  const [nameDate, setnameDate] = useState([]);
  //날짜가 겹치면 그 이름을 담기위해
  const [nameName, setnameName] = useState([]);
  useEffect(() => {
    //드롭다운
    const names = gr_dto2.slice(0, 4).map((obj) => obj.gr_name);
    setGrdtoName(names);
    // 이름 날짜
    const rsvNaDate = rsv_dto.map((res) => ({
      rsv_ac_name: res.rsv_room_name,
      rsv_start: res.rsv_start,
      rsv_end: res.rsv_end,
    }));
    setnameDate(rsvNaDate);
  }, [rsv_dto, gr_dto2]);

  useEffect(() => {
    console.log(nameDate);
    const overlappingReservations = nameDate.filter((reservation) => {
      const rsvStartDate = new Date(reservation.rsv_start);
      const rsvEndDate = new Date(reservation.rsv_end);
      return (
        (rsvStartDate >= startDate && rsvStartDate <= endDate) ||
        (rsvEndDate >= startDate && rsvEndDate <= endDate) ||
        (rsvStartDate <= startDate && rsvEndDate >= endDate)
      );
    });

    const overlappingReservationNames = overlappingReservations.map(
      (reservation) => reservation.rsv_ac_name
    );
    setnameName(overlappingReservationNames);
    //console.log(overlappingReservationNames); //겹치는 날짜에 해당하는 객실이름
  }, [nameDate, startDate, endDate]);

  //드롭다운하기위해
  const [grdtoName2, setGrdtoName2] = useState([]);
  useEffect(() => {
    const arr = grdtoName.filter((item) => !nameName.includes(item));
    setGrdtoName2(arr);
    //console.log(arr);
  }, [nameName, grdtoName]);

  return (
    <div>
      <div>
        <main className='main'>
          <div className='leftandright'>
            {/* 호텔사진 */}
            <div className='left'>
              <img src={ac_dto.ac_thumbnail} />
            </div>
            {/* 호텔정보 */}
            <div className='right'>
              <div className='roomlayout1'>
                <div className='room0'></div>
                <div className='room'>
                  <p>{ac_dto.ac_name}</p>
                </div>
                <div className='roomtype'>
                  <p>{ac_dto.ac_type_name}</p>
                </div>
              </div>
              <div className='roomlayout2'>
                <div className='addresslayout'>
                  <div className='addressimg'></div>
                  <div className='addresstext'>
                    <p>
                      <b>{ac_dto.ac_address}</b>
                    </p>
                  </div>
                </div>
              </div>
              <div className='roomlayout3'>
                <div className='phonelayout'>
                  <div className='phoneimg'></div>
                  <div className='phonetext'>
                    <p>
                      <b>{ac_dto.ac_phone_number}</b>
                    </p>
                  </div>
                </div>
                <div className='roomtimelayout'>
                  <div className='timelayout'></div>
                  <div className='timetext'>
                    <p>
                      <b>
                        모든객실 체크인= {ac_dto.ac_check_in} 체크아웃={' '}
                        {ac_dto.ac_check_out}
                      </b>
                    </p>
                  </div>
                </div>
              </div>
              <div className='roomlayout4'>
                <div className='roomlayout4_1'>
                  <b>인기시설 및 서비스</b>
                </div>
                <div className='roomlayout4_2'>
                  <ul>
                    {ac_serv_dto.map((ac_serv, idx) => {
                      return <Detail_tag ac_serv={ac_serv} key={idx} />;
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* 호텔 객실정보 */}
          <div className='mainbottom'>
            <div className='cal'>
              <div className='calendar_layout'>
                <div className='calender-container'>
                  <DatePicker
                    selected={startDate}
                    className='custom-datepicker'
                    onChange={onChange}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    inline
                  />
                </div>
                <div>
                  <div className='calendar_text'>
                    {startDate && endDate && (
                      <div>
                        <div>
                          {formatDate(startDate)} ~ {formatDate(endDate)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className='choose_layout'>
                <div className='menu-container'>
                  <button onClick={handleClick}>
                    {visible ? '객실선택▼' : '객실선택▲'}
                  </button>
                  {visible && (
                    <Dropdown>
                      <ul>
                        {grdtoName2.map((react) => {
                          return (
                            <li onClick={divChange} key={react}>
                              <h5>{react}</h5>
                            </li>
                          );
                        })}
                      </ul>
                    </Dropdown>
                  )}
                </div>
                <div className='collayout'>
                  <div className='collayout_1'>
                    <div className='col_date'>
                      {startDate && endDate && (
                        <p>
                          {formatDate(startDate)} ~ <br />
                          {formatDate(endDate)}
                        </p>
                      )}
                    </div>
                    <div>
                      <div className='col_text'>
                        {rsv_dto.rsv_start}
                        인원추가는
                        <br /> 현장결제로 해주세요
                      </div>
                    </div>
                  </div>
                  <div className='collayout_2'>
                    <div className='collayout_2_1'>
                      {visible2 ? selectedGrName : null}객실
                    </div>
                    <div className='collayout_2_2'>
                      총합계:{gr_dto2.gr_name}
                    </div>
                    <div className='collayout_2_3'>
                      {visible2 ? selectedGrPrice : null}
                    </div>
                  </div>

                  <button className='ye_button' onClick={handleOpenModal}>
                    예약하기
                  </button>
                  {isModalOpen && (
                    <Modal
                      isOpen={isModalOpen}
                      onClose={handleCloseModal}
                      ac_dto={ac_dto}
                      gr_dto={gr_dto2}
                      selectedGrName={selectedGrName}
                      selectedGrPrice={selectedGrPrice}
                      selectedGrpersonmax={selectedGrpersonmax}
                      selectedGrpersonmin={selectedGrpersonmax}
                      startDate={startDate}
                      endDate={endDate}
                      formatDate={formatDate}
                    />
                  )}
                </div>
              </div>
            </div>
            {/* 객실선택,판매자정보,숙소정책,위치 */}
            <div className='menu_layout'>
              <div className='menu'>
                {content.map((section, index) => (
                  <button
                    key={section.tab}
                    onClick={() => contentChange(index)}
                  >
                    {section.tab}
                  </button>
                ))}
              </div>
              <div className='menu_1'>{contentItem.contents}</div>
            </div>
            <div className='review'>
              <Rating ac_id={ac_id} />
            </div>
          </div>
        </main>
        <div className='footer'>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Detail;
