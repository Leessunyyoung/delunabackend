import axios from 'axios';
import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { baseUrl } from '../../commonApi/baseApi';
import './Reviewlist.css';

const ReviewList = (props) => {
  const { inputs1, inputs2, rev_rating, rev_content } = props;

  //현재날짜
  const currentDate2 = new Date();

  //css
  const Stars = styled.div`
    display: flex;
    padding-top: 5px;

    & svg {
      color: #fcc419;
    }
  `;
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(rev_content);

  const handleEditButtonClick = () => {
    setIsEditing(true);
  };
  const handleCancelButtonClick = () => {
    setIsEditing(false);
  };

  const rev_id = props.rev_id;
  const handleSaveButtonClick = (e) => {
    // axios 요청 등의 작업을 수행하여 수정된 리뷰를 서버에 저장할 수 있습니다.
    e.preventDefault();
    axios
      .put(`${baseUrl}/review/update/${rev_id}`, {
        rev_content: editedContent,
      })
      .then((response) => {
        setIsEditing(false);
        // 수정 완료 후 처리할 내용
      })
      .catch((error) => {
        console.error(error);
      });
    setIsEditing(false);
  };
  return (
    <div>
      <div className='Review_listlayout'>
        <div className='user_name'>{inputs2}</div>
        {isEditing ? (
          <textarea
            className='Review_content'
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
        ) : (
          <div className='Review_content'>{rev_content}</div>
        )}
        <div className='star_buttonlayout'>
          <div className='star_list'>
            <div className='star_list_layout'>
              <Stars>
                {[...Array(rev_rating)].map((_, i) => (
                  <FaStar key={i + rev_rating} />
                ))}
              </Stars>
            </div>
            <div className='review_date_layout'>
              {currentDate2.getFullYear() +
                `년` +
                (currentDate2.getMonth() + 1) +
                `월` +
                currentDate2.getDate() +
                `일 `}
            </div>
          </div>
          <div className='review_button'>
            {/* to={`/review/update/${rev_id}/${rev_content}`} */}
            {isEditing ? (
              <>
                <button onClick={handleSaveButtonClick}>저장</button>
                <button onClick={handleCancelButtonClick}>취소</button>
              </>
            ) : (
              <>
                <button onClick={handleEditButtonClick}>수정</button>
                <button onClick={() => props.handleDeleted(rev_id)}>
                  삭제
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewList;
