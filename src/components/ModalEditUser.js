import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalEditUser = (props) => {
  const { isShowModelEditUser, handleClose, dataUserEdit } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState(dataUserEdit.last_name);

  useEffect(() => {
    if (isShowModelEditUser) {
      setName(dataUserEdit.first_name);
    }
  }, [dataUserEdit]);

  console.log(">>> Check handleEditUser: ", dataUserEdit);

  return (
    <>
      <Modal show={isShowModelEditUser} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edir a user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Job</label>
              <input
                type="text"
                className="form-control"
                name="job"
                value={job}
                onChange={(event) => {
                  setJob(event.target.value);
                }}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Confirm</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalEditUser;
