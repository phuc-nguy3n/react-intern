import { Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/Login";
import TableUsers from "../components/TableUsers";
import { useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import PrivateRoute from "./PriveRoutes";
import NotFound from "./NotFound";

const AppRoutes = (props) => {
  const { setIsLoggedIn, setHiden } = props;
  const { loginContext } = useContext(UserContext);

  useEffect(() => {
    let token = localStorage.getItem("token");
    let emailTemp = localStorage.getItem("email");
    if (token && emailTemp) {
      setIsLoggedIn(true);
      loginContext(emailTemp, token);
    }
  }, []);

  useEffect(() => {
    if (window.location.pathname === "/login") {
      setHiden(true);
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} setHiden={setHiden} />}
        />

        <Route
          path="/users"
          element={
            <PrivateRoute>
              <TableUsers />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
