import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { putUpdateUser } from "../services/userService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModalEditUser = (props) => {
  const {
    isShowModelEditUser,
    handleClose,
    dataUserEdit,
    handleEditUserFormModal,
  } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleEditUser = async () => {
    let res = await putUpdateUser(dataUserEdit.id, name, job);
    if (res && res.updatedAt) {
      // success
      setJob("");
      handleClose();
      toast.success("Edit user successfully");
      handleEditUserFormModal({
        first_name: name,
        id: dataUserEdit.id,
      });
    } else {
      // faild
      handleClose();
      toast.error("Error editing user");
    }
  };

  useEffect(() => {
    if (isShowModelEditUser) {
      setName(dataUserEdit.first_name);
    }
  }, [dataUserEdit]);

  return (
    <>
      <Modal
        backdrop="static"
        keyboard={false}
        show={isShowModelEditUser}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit a user</Modal.Title>
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
          <Button
            variant="primary"
            onClick={() => {
              handleEditUser();
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalEditUser;
