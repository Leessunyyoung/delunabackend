import './detail_tag.css'

const Detail_tag = (props) => {
  const ac_serv_desc = props.ac_serv.ac_serv_desc;
  const ac_serv_image = props.ac_serv.ac_serv_image;
  // console.log("check : " + ac_serv_desc);
  return (
    <div>
      <li className="roomlayout4_2_1">
        <img src={ac_serv_image} />
        <div className="roomlayout4_2_1_text">{ac_serv_desc}</div>
      </li>
    </div>
  );
};

export default Detail_tag;
