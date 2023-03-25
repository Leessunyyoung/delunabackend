import "../../CSS/MainViewAll.css";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";
import Viewallinfo from "./Tags/Viewallinfo";
import { useEffect, useState } from "react";
import axios from "axios";
import Checkbox from "./Filter/Checkbox";
import Searchbar from "./Search/Searchbar";
import { useLocation, useParams } from "react-router-dom";

const Mainviewall = () => {
  const [hotels, setHotels] = useState(); //호텔정보 데이터를 저장(이벤트 발생에 따라 값이 바뀜)
  const [tags, setTags] = useState(); //호텔별 태그 정보를 저장
  const [copyHotels, setCopyHotels] = useState(); //호텔의 전체 데이터를 저장(초기의 데이터로 복구하기 위한 사본)
  const [defaultHotels, setDefaultHotels] = useState();
  const [grs, setGrs] = useState(); //객실정보 데이터를 저장
  const [rvs, setRvs] = useState();

  let changeHotels = [];
  let changeHotels2 = [];
  // const [hotelsTag, setHotelsTag] = useState();

  const tag_number = useParams().tag_number;

  const location = useLocation();
  // let loc = location.state.loc;
  // let head = location.state.head;

  async function getHotelsAll() {
    if (typeof tag_number != "undefined") {
      await axios
        .get(`http://localhost:8090/mainViewAll/${tag_number}`)
        .then((response) => {
          setHotels(response.data.dto);
          setTags(response.data.tagdto);
          setGrs(response.data.grdto);
          setCopyHotels(response.data.dto);
          setDefaultHotels(response.data.dto);
          setRvs(response.data.rvdto);
          // setHotelsTag(response.data.rvtdto);
          if (location.state) {
            let loc = location.state.loc;
            let head = location.state.head;
            response.data.dto.map((hotels) =>
              hotels.ac_address_middle === loc //현재 받아온 id만 비교하여 일치하는 값만
                ? changeHotels.push(hotels) //임시 저장소에 저장함
                : null
            );
            response.data.grdto.map((gr) =>
              gr.gr_person_min <= parseInt(head) &&
              gr.gr_person_max >= parseInt(head) //현재 받아온 id만 비교하여 일치하는 값만
                ? changeHotels.map((hotels) =>
                    hotels.ac_id === gr.ac_id
                      ? changeHotels2.push(hotels)
                      : null
                  )
                : null
            );

            const result = changeHotels2.reduce((acc, v) => {
              return acc.includes(v) ? acc : [...acc, v];
            }, []);
            setHotels(result);
            setCopyHotels(result);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      await axios
        .get(`http://localhost:8090/mainViewAll/0`)
        .then((response) => {
          setHotels(response.data.dto);
          setTags(response.data.tagdto);
          setGrs(response.data.grdto);
          setCopyHotels(response.data.dto);
          setDefaultHotels(response.data.dto);
          setRvs(response.data.rvdto);
          // setHotelsTag(response.data.rvtdto);
          if (location.state) {
            let loc = location.state.loc;
            let head = location.state.head;
            response.data.dto.map((hotels) =>
              hotels.ac_address_middle === loc //현재 받아온 id만 비교하여 일치하는 값만
                ? changeHotels.push(hotels) //임시 저장소에 저장함
                : null
            );
            response.data.grdto.map((gr) =>
              gr.gr_person_min <= parseInt(head) &&
              gr.gr_person_max >= parseInt(head) //현재 받아온 id만 비교하여 일치하는 값만
                ? changeHotels.map((hotels) =>
                    hotels.ac_id === gr.ac_id
                      ? changeHotels2.push(hotels)
                      : null
                  )
                : null
            );
            const result = changeHotels2.reduce((acc, v) => {
              return acc.includes(v) ? acc : [...acc, v];
            }, []);
            setHotels(result);
            setCopyHotels(result);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  const getHotels = (hotels) => {
    //자식 컴포넌트로부터 hotels 데이터 값을 돌려받은 뒤 새로운 값으로 저장 시켜줌

    const result = hotels.reduce((acc, v) => {
      return acc.includes(v) ? acc : [...acc, v];
    }, []);
    setHotels(result);
  };

  useEffect(() => {
    getHotelsAll();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  return (
    <div className="ViewAll">
      {/* <Searchbar
        copyHotels={defaultHotels}
        grs={grs}
        getHotels={getHotels}
      ></Searchbar> */}
      <div className="ViewAllSection">
        <Checkbox
          copyHotels={copyHotels}
          tags={tags}
          getHotels={getHotels}
        ></Checkbox>
        <div className="ViewAllInfo">
          {hotels &&
            hotels.map((e, idx) => {
              return (
                <Viewallinfo
                  hotel={e}
                  grs={grs}
                  rvs={rvs}
                  tags={tags}
                  key={idx}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Mainviewall;
