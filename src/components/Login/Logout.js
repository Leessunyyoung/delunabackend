import { useEffect } from "react";

const Logout = () => {
  useEffect(() => {
    localStorage.removeItem("Authorizaton");
    localStorage.removeItem("username");
    localStorage.clear();
    window.location.replace("/");
  });
};

export default Logout;
