import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import './ReviewDetail.css';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../commonApi/baseApi';
import ReviewList from '../review/Reviewlist';

const Rating = (props) => {
  //css
  const Stars = styled.div`
    display: flex;
    padding-top: 5px;

    & svg {
      color: gray;
      cursor: pointer;
    }

    :hover svg {
      color: #fcc419;
    }

    & svg:hover ~ svg {
      color: gray;
    }

    .yellowStar {
      color: #fcc419;
    }
  `;
  //별점
  //map함수는 배열을 받아 새로운 배열로 리턴하는 함수이기에
  //별5개를 리턴하기 위해 상수 ARRAY=[0,1,2,3,4]를 선언하여 map을 돌린다.
  const ARRAY = [0, 1, 2, 3, 4];

  const [clicked, setClicked] = useState([false, false, false, false, false]);

  //  별점 넣기위해
  const [rev_rating, setRevrating] = useState('');

  // el = index
  const handleStarClick = (index) => {
    let clickStates = [...clicked];
    // console.log(clickStates);
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
  };
  const ac_id = useParams().ac_id;
  //리뷰카운트수
  const [postCount, setPostCount] = useState();
  //리뷰가져오기
  useEffect(() => {
    sendReview();
    axios
      .get(`http://localhost:8090/detail/reviewlist/${ac_id}`)
      .then((response) => {
        console.log(response.data);
        setRevgetrating(response.data);
      });
  }, [clicked]); //컨디마 컨디업

  const sendReview = () => {
    let score = clicked.filter(Boolean).length;
    setRevrating(score);
  };

  // 리뷰 글쓰기///////////////////////////////////////////////
  const [inputs, setInputs] = useState({
    rev_writer: '나는멍청이',
  });

  const [rev_content, setrevContent] = useState(''); //e.target.value를 담기위해

  const [revgetrating, setRevgetrating] = useState([]);

  const handleContentChange = (e) => {
    setrevContent(e.target.value);
  };

  const { rev_writer } = inputs;

  const onSubmit = async (e) => {
    //e.preventDefault(); //빼면은 자동으로 새로고침이된다.
    const formData = new FormData();
    formData.append('ac_id', ac_id); //임의
    formData.append('username',localStorage.getItem('username')); //임의
    formData.append('rev_content', rev_content);
    formData.append('rev_rating', rev_rating);
    formData.append('rev_writer', rev_writer); //임의

    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    await axios
      .post(`${baseUrl}/detail/review`, formData, config)
      .then((response) => {
        setInputs({ ac_id: '' });
      })
      .catch((err) => {
        console.log(err);
      });

    ////////////리뷰삭제
  };

  const handleDeleted = async (rev_id) => {
    // e.preventDefault();
    await axios
      .delete(`${baseUrl}/review/delete/${rev_id}`)
      .then((response) => {
        console.log('성공');
        window.location.reload();
        return;
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className='Review_top'>
          <div className='Review_header'>
            <h3>후기작성</h3>
          </div>
          <div className='Review_header2'>
            <div className='Review_header3'>
              <div className='header3_h4layout'>
                <h4>별점을 매겨주세요!</h4>
              </div>
              <Stars>
                {ARRAY.map((el, idx) => (
                  <FaStar
                    key={idx}
                    size='20'
                    onClick={() => handleStarClick(el)}
                    className={clicked[el] && 'yellowStar'}
                    // id='starstarstar'
                  ></FaStar>
                ))}
              </Stars>
            </div>
          </div>
          <div className='Review_header_3'>
            <h4>상세한 후기를 작성해주세요!</h4>
          </div>
          <div className='Review_header_4'>
            <textarea
              rows='3'
              placeholder='후기를 작성해주세요.'
              maxLength='1000'
              onChange={handleContentChange}
            ></textarea>

            <input
              type='submit'
              value='등록'
              className='reply_submit_button'
            />
          </div>
        </div>
      </form>
      {/* 리뷰list */}
      <div className='Review_bottomlayout'>
        <div className='Review_bottom'>
          {revgetrating.map((inputs, idx) => {
            return (
              <ReviewList
                key={idx}
                inputs1={inputs.ac_id}
                inputs2={inputs.username}
                rev_rating={inputs.rev_rating}
                rev_content={inputs.rev_content}
                handleDeleted={handleDeleted}
                rev_id={inputs.rev_id}
              />
            );
          })}
        </div>
        <div></div>
      </div>
    </div>
  );
};
export default Rating;
