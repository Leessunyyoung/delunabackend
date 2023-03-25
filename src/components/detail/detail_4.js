import { useEffect, useState } from 'react';
import './detail_4.css';

const Detail_4 = (props) => {
  const { kakao } = window;
  const ac_dto = props.ac_dto;

  useEffect(() => {
    const container = document.getElementById('map');
    //지도를 담을 영역의 DOM 레퍼런스
    const options = {
      center: new kakao.maps.LatLng(ac_dto.ac_longitude,ac_dto.ac_latitude), //지도의 중심좌표
      level: 2,
    };
    const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

    new kakao.maps.Marker({
      //마커가 표시 될 지도
      map: map,
      //마커가 표시 될 위치
      position: new kakao.maps.LatLng(ac_dto.ac_longitude,ac_dto.ac_latitude),
    });
  }, []);

  return (
    <div>
      <div id='map'></div>
      <div className='map_location'>
        <div className='map_img'></div>
        <div className='map_location2'>{ac_dto.ac_address}</div>
      </div>
    </div>
  );
};

export default Detail_4;
