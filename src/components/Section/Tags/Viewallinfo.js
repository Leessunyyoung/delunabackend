import { NavLink } from "react-router-dom";
import Stars from "./Stars";

const Viewallinfo = (props) => {
  const { hotel } = props;
  let grs = props.grs;
  let rvs = props.rvs;
  let tags = props.tags;

  let price; //최종적으로 표출할 1개의 가격 샘플 데이터를 저장
  let review; //최종적으로 표출할 1개의 샘플 리뷰 데이터를 저장
  let reviewCount; //뷰에 출력할 전체 후기 수를 저장
  let reviewStars; //뷰에 출력할 별점 데이터를 저장
  let changeHotelsPrice = []; //뷰에 출력할 호텔 가격을 저장
  let changeHotelsReview = []; //뷰에 출력할 리뷰 데이터를 저장
  let hotelTags = []; //뷰에 출력할 태그 박스 데이터를 저장

  grs.map((gr) =>
    hotel.ac_id === gr.ac_id
      ? changeHotelsPrice.push(gr) && (price = changeHotelsPrice[0].gr_price)
      : null
  );

  rvs.map((rv) =>
    hotel.ac_id === rv.ac_id
      ? changeHotelsReview.push(rv) && //임시 저장소에 id값이 일치하는 데이터만 저장한다.
        changeHotelsReview.map(
          (rv) =>
            rv.rev_rating >= 4 //표출할 리뷰 개체 중 별점이 4이상인 리뷰만 샘플로 출력할 수 있도록함
              ? (review = rv.rev_content) //***해당코드는 반복을 수행하며 조건에해당하는 데이터 중 가장 마지막으로 저장된 값을 출력하므로 비효율적임(추후 수정요망)
              : (review = changeHotelsReview[0].rev_content) //해당 호텔의 리뷰중 별점4이상의 리뷰가 존재하지 않으면
        ) && //인덱스0의 리뷰를 표출한다.
        (reviewCount = changeHotelsReview.length) && //리뷰배열의 길이를 측정하여 전체 후기 수를 파악한다.
        (reviewStars = 1) //합계(changeHotelsReview.stars) / changeHotelsReview.length
      : null
  );

  tags.map((tag) =>
    hotel.ac_id === tag.ac_id ? hotelTags.push(tag.ac_serv_desc) : null
  );

  if (hotel)
    return (
      <>
        <div className="ViewAllInfoItem">
          <div>
            <img src={hotel.ac_thumbnail} alt="" className="InfoHotelImg" />
            <div className="ViewAllInfoTitle">
              <p>{hotel.ac_name}</p>
              <div className="ViewAllInfoText">
                <div className="ViewAllInfoTextLeft">
                  <img src="/images/location.png" alt="" />
                  <span className="LeftAdd">
                    {hotel.ac_address_main} &nbsp;
                    {hotel.ac_address_middle}
                  </span>
                  <div className="LeftTagBoxs">
                    {hotelTags.map((tag, idx) => {
                      return <button key={idx}>{tag}</button>;
                    })}
                  </div>
                  <div className="LeftReviewCount">(후기 {reviewCount}개)</div>
                  <div className="LeftReviewSample">{review}</div>
                </div>
                <div className="ViewAllInfoTextRight">
                  <img src="/images/check.png" alt="" id="CheckIcon" />
                  <div className="RightCheck">무료취소, 현장결제</div>
                  <div className="RightPrice">
                    {price === undefined ? <p>숙소에직접문의</p> : price}
                  </div>
                  <NavLink to={`/detail/${hotel.ac_id}`}>
                    <button className="RightSubmit">선택</button>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
};

export default Viewallinfo;
