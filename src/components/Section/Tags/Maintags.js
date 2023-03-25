import { NavLink } from "react-router-dom";

const Maintags = (props) => {
  const { hotel } = props;

  if (hotel)
    return (
      <div>
        <NavLink
          to={`/detail/${hotel.ac_id}`}
          style={{ textDecoration: "none" }}
        >
          <img src={hotel.ac_thumbnail} alt="" />
          <span>{hotel.ac_name}</span>
        </NavLink>
      </div>
    );
  else return null;
};

export default Maintags;
