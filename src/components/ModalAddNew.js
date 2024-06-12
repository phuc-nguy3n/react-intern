import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { postCreateUser } from "../services/userService";
import { toast } from "react-toastify";

const ModalAddNew = (props) => {
  const { isShowModelAddNew, handleClose, handleUpdateTable } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleSaveUser = async () => {
    let res = await postCreateUser(name, job);
    console.log(">>> Check res: ", res);
    if (res && res.id) {
      // success
      handleClose();
      setName("");
      setJob("");
      toast.success("Created user successfully");
      handleUpdateTable({ id: res.id, first_name: res.name });
    } else {
      // error
      handleClose();
      toast.error("Error creating user");
    }
  };

  return (
    <>
      <Modal
        backdrop="static"
        keyboard={false}
        show={isShowModelAddNew}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
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
          <Button variant="primary" onClick={handleSaveUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAddNew;
