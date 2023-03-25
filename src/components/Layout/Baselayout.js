import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

const BaseLayout = () => {
  return (
    <div>
      {" "}
      <Header />
      <Outlet />
    </div>
  );
};

export default BaseLayout;
