import "./App.scss";
import Header from "./components/Header";
import Container from "react-bootstrap/Container";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hiden, setHiden] = useState(false);

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
          <AppRoutes setIsLoggedIn={setIsLoggedIn} setHiden={setHiden} />
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
