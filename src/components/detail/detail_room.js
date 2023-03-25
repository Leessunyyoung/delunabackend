import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

const Detail_room = (props) => {
  const gr_dto2 = props.gr_dto2;

  const divRef = useRef();
  const divRef2 = useRef();

  useEffect(() => {}, []);

  const get_images = async () => {
    await axios.get('http://localhost:8090/detail/');
  };

  return (
    <div>
      <div className='gakimg'>
        <img src={gr_dto2.gr_p_image} />
      </div>
      <div className='gakname'>
        <div className='gaknametext'>{gr_dto2.gr_name}</div>
      </div>
      <div className='gaknametext2'>
        최소인원 : {gr_dto2.gr_person_min} ~ 최대인원: {gr_dto2.gr_person_max}
      </div>
      <div className='gaknametext3'>{gr_dto2.gr_price}</div>
    </div>
  );
};

export default Detail_room;
