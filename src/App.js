import "./App.scss";
import Header from "./components/Header";
import ModalAddNew from "./components/ModalAddNew";
import TableUsers from "./components/TableUsers";
import Container from "react-bootstrap/Container";
import { useState } from "react";

function App() {
  const [isShowModelAddNew, setShowModelAddNew] = useState(false);

  const handleClose = () => setShowModelAddNew(false);
  const handleShow = () => setShowModelAddNew(true);

  return (
    <div className="app-container">
      <Header />
      <Container>
        <div className="my-3 add-new">
          <span>
            <b>List Users:</b>
          </span>
          <button className="btn btn-success" onClick={handleShow}>
            Add new user
          </button>
        </div>
        <TableUsers />
      </Container>

      <ModalAddNew
        isShowModelAddNew={isShowModelAddNew}
        handleClose={handleClose}
      />
    </div>
  );
}

export default App;
