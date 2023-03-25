import Slider from "../Slider/Slider";
import "../../CSS/MainSection.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Maintags from "./Tags/Maintags";
import { NavLink } from "react-router-dom";
import Footer from "../Footer/footer";
import Searchbar from "./Search/Searchbar";

const Mainsection = () => {
  let colors = [
    {
      id: 0,
      src: "https://yaimg.yanolja.com/resize/place/v4/2017/08/20/06/640/5998a7523f19c8.55111195.jpg",
    },
    {
      id: 1,
      src: "https://yaimg.yanolja.com/v5/2022/05/26/10/640/628f54ba74ab97.83195095.jpg",
    },
    {
      id: 2,
      src: "https://yaimg.yanolja.com/v5/2022/10/18/09/640/634e775056ace6.77356804.jpg",
    },
    {
      id: 3,
      src: "https://yaimg.yanolja.com/v5/2022/10/13/10/640/6347ebc7659445.35307962.jpg",
    },
    {
      id: 4,
      src: "https://yaimg.yanolja.com/v5/2022/10/21/14/640/6352b2ae4578f4.97711317.jpeg",
    },
    {
      id: 5,
      src: "https://yaimg.yanolja.com/v5/2022/10/12/15/640/6346d83cb46ce3.29491326.jpg",
    },
    {
      id: 6,
      src: "https://yaimg.yanolja.com/v5/2022/09/06/10/640/63172324d96a66.34005926.jpg",
    },
    {
      id: 7,
      src: "https://yaimg.yanolja.com/v5/2022/09/07/21/640/6319076ab81789.21182601.JPG",
      url: "detail/recc_lists[0][7].ac_id",
      name: "wwwhotel",
    },
  ];

  let hotelName = [{ 1: "wwwhotel" }, { 2: "dddmotel" }];
  const recc_lists1 = [];
  const recc_lists2 = [];
  const recc_lists3 = [];

  // 실시간 인기 숙소 세팅
  const customOptions = {
    slideToShow: 3,
    previewRatio: 0.5,
    imageFit: "contain",
  };

  // 호텔 정보
  const [hotels, setHotels] = useState();

  const [hotelsTag, setHotelsTag] = useState();

  // spring에서 리스트 가져오기
  async function getList() {
    await axios
      .get("http://localhost:8090")
      .then((response) => {
        setHotels(response.data.dto);
        setHotelsTag(response.data.rvtdto);
      })
      .catch((error) => {
        console.log(error);
        console.log("getTest error");
      });
  }

  useEffect(() => {
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (hotelsTag) {
    hotelsTag.map((tag) => {
      if (tag.ac_tag_number === 3) {
        hotels.map((hotel) => {
          if (tag.ac_id === hotel.ac_id) {
            recc_lists1.push(hotel);
          }

          return hotel;
        });
      } else if (tag.ac_tag_number === 1) {
        hotels.map((hotel) => {
          if (tag.ac_id === hotel.ac_id) {
            recc_lists2.push(hotel);
          }
          return hotel;
        });
      } else if (tag.ac_tag_number === 6) {
        hotels.map((hotel) => {
          if (tag.ac_id === hotel.ac_id) {
            recc_lists3.push(hotel);
          }
          return hotel;
        });
      }

      return tag;
    });
  }

  let recc_lists = [];
  recc_lists.push(
    recc_lists1.reduce((acc, v) => {
      return acc.includes(v) ? acc : [...acc, v];
    }, [])
  );
  recc_lists.push(
    recc_lists2.reduce((acc, v) => {
      return acc.includes(v) ? acc : [...acc, v];
    }, [])
  );

  recc_lists.push(
    recc_lists3.reduce((acc, v) => {
      return acc.includes(v) ? acc : [...acc, v];
    }, [])
  );

  let recc_sample_lists1 = [];
  let recc_sample_lists2 = [];
  let recc_sample_lists3 = [];

  recc_sample_lists1.push(
    recc_lists[0][2],
    recc_lists[0][53],
    recc_lists[0][105],
    recc_lists[0][107]
  );
  recc_sample_lists2.push(
    recc_lists[1][9],
    recc_lists[1][59],
    recc_lists[1][103],
    recc_lists[1][100]
  );
  recc_sample_lists3.push(
    recc_lists[2][2],
    recc_lists[2][57],
    recc_lists[2][105],
    recc_lists[2][124]
  );

  return (
    <div className="App_section">
      {/* 카테고리 박스 */}
      {/* <div className="CategoryBox">
        {tag_lists.map((tag_list, idx) => {
          return (
            <div key={idx}>
              <NavLink className="CategoryLink 001">
                <div>{tag_list}</div>
              </NavLink>
            </div>
          );
        })}
      </div> */}
      {/* 검색창 */}
      <div>
        {/* <form onSubmit={onSearchSubmit}> */}
        {/* <button type="submit"> */}
        <img src="/images/222.jpg" id="SearchImage" alt="" />
        {/* </button> */}

        {/* </form> */}
        <div className="Searchbar">
          {/* <Searchbar></Searchbar> */}
        </div>
      </div>
      {/* 확인용 */}
      {/* <div>check:{search_input}</div> */}
      {/* 인기 숙소 */}
      <div className="MainBanner">
        <h3>실시간 인기 숙소</h3>

        <Slider
          slides={colors}
          customOptions={customOptions}
          hotelName={hotelName}
        ></Slider>
      </div>
      {/* 추천 리스트 */}
      <div>
        <div className="MainTags">
          <div className="MainTagsItems">
            <div>
              <h2>가성비 숙소를 찾으시나요?</h2>
            </div>
            <NavLink className="MainTagsViewAll" to="/mainViewAll/1">
              <span>더보기</span>
            </NavLink>
            <div className="MainTagsItemsSlide">
              {hotels &&
                recc_sample_lists1.map((hotel, idx) => {
                  return <Maintags hotel={hotel} key={idx} />;
                })}
            </div>
          </div>
          <div className="MainTagsItems">
            <div>
              <h2>위생 청결에 안심할 수 있는 대표 숙소</h2>
            </div>

            <NavLink className="MainTagsViewAll" to="/mainViewAll/1">
              <span>더보기</span>
            </NavLink>
            <div className="MainTagsItemsSlide">
              {hotels &&
                recc_sample_lists2.map((hotel, idx) => {
                  return <Maintags hotel={hotel} key={idx} />;
                })}
            </div>
          </div>
          <div className="MainTagsItems">
            <div>
              <h2>바다와 수영장은 필수이죠!</h2>
            </div>

            <NavLink className="MainTagsViewAll" to="/mainViewAll/6">
              <span>더보기</span>
            </NavLink>
            <div className="MainTagsItemsSlide">
              {hotels &&
                recc_sample_lists3.map((hotel, idx) => {
                  return <Maintags hotel={hotel} key={idx} />;
                })}
            </div>
          </div>
        </div>
      </div>

      <div className="Etc">
        <Footer />
      </div>
    </div>
  );
};

export default Mainsection;
