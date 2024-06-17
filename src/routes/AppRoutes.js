import { Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/Login";
import TableUsers from "../components/TableUsers";
import { useEffect } from "react";
import PrivateRoute from "./PriveRoutes";
import NotFound from "./NotFound";
import { useDispatch } from "react-redux";
import { handleRefresh } from "../redux/actions/userActions";

const AppRoutes = (props) => {
  const { setIsLoggedIn, setHiden } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
      dispatch(handleRefresh());
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
