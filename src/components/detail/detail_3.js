import './detail_3.css';
const Detail_3 = (props) => {

  const ac_dto = props.ac_dto;

  return (
    <div className='gungchaklayout'>
      <div className='gungchaktext'>
        <span>안내</span>
      </div>
      <div className='annaelayout'>
        <div className='annaelayout_1'>이용안내</div>
      </div>
      <div className='annaetext'>
         <div className='annaetext_1'> 확인 사항 </div>
          <div className='annaetext_1_2'>{ac_dto.ac_notification}</div>
      </div>
      <div className='annaelayout_2'>
        <div className='annaelayout_2_1'>숙소소개</div>
      </div>
      <div className='annaetext_2'>
        {ac_dto.ac_information}
      </div>
    </div>
  );
};

export default Detail_3;
