import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Join from "./components/Login/Join";
import Mypage from "./components/Login/Mypage";
import BaseLayout from "./components/Layout/Baselayout";
import Home from "./components/Home";
import Mainviewall from "./components/Section/Mainviewall";
import Detail from "./components/detail/detail";
import Logout from "./components/Login/Logout";
// import Mypage from "./components/mypage/mypage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<Home />} />

          <Route path="login" element={<Login />} />
          <Route path="join" element={<Join />} />

          <Route path="logout" element={<Logout />} />
          <Route path="mypage" element={<Mypage />} />

          <Route path="mainViewAll" element={<Mainviewall />} />
          <Route path="mainViewAll/:tag_number" element={<Mainviewall />} />
          {/* <Route path="/mypage" element={<Mypage />} /> */}
          <Route path="detail/:ac_id" element={<Detail />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
