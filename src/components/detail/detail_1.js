import React, { useEffect, useRef, useState } from 'react';
import './detail_1.css';
import Detail_room from './detail_room';

const Detail_1 = (props) => {
  const gr_dto2 = props.gr_dto2;

  const [count, setCount] = useState(0);

  const count2 = setCount + 1;
  useEffect(() => {});

  return (
    <div>
      <div className='detail_1_layout'>
        {gr_dto2 &&
          gr_dto2.map((items, idx) => {
            return (
              <div className='detaillayouta' key={idx}>
                <div>
                  <Detail_room gr_dto2={items} />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Detail_1;
