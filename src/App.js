import "./App.scss";
import Header from "./components/Header";
import TableUsers from "./components/TableUsers";
import Container from "react-bootstrap/Container";
import Home from "./components/Home";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "./context/UserContext";

function App() {
  const { loginContext } = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hiden, setHiden] = useState(false);

  let token = localStorage.getItem("token");
  let emailTemp = localStorage.getItem("email");

  useEffect(() => {
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
      <div className="app-container">
        <Header
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          hiden={hiden}
          setHiden={setHiden}
        />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/users"
              element={
                token && emailTemp ? (
                  <TableUsers />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/login"
              element={
                <Login setIsLoggedIn={setIsLoggedIn} setHiden={setHiden} />
              }
            />
            Login
          </Routes>
        </Container>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="light"
        />
      </div>
    </>
  );
}

export default App;
