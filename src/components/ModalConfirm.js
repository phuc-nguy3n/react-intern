import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteUser } from "../services/userService";

const ModalConfirm = (props) => {
  const {
    isShowModelDelete,
    handleClose,
    dataUserDelete,
    handleConfirmDeleteUser,
  } = props;

  const confirmDelete = async () => {
    let res = await deleteUser(dataUserDelete.id);
    if (res && +res.statusCode === 204) {
      // success
      handleClose();
      handleConfirmDeleteUser(dataUserDelete);
      toast.success("Delete user successfully");
    } else {
      // error
      handleClose();
      toast.error("Error delete user");
    }
  };
  return (
    <>
      <Modal
        backdrop="static"
        keyboard={false}
        show={isShowModelDelete}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete a user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            Are you sure you want to delete this user ?
            <br />
            <span>
              <b> email = "{dataUserDelete.email}"</b>
            </span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={confirmDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalConfirm;
