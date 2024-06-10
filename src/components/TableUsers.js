import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../services/userService";
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNew";
import ModalEditUser from "./ModalEditUser";
import ModalConfirm from "./ModalConfirm";
import _ from "lodash";

const TableUsers = (props) => {
  const [userlist, setUserlist] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [isShowModelAddNew, setShowModelAddNew] = useState(false);

  const [isShowModelEditUser, setShowModelEditUser] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState({});

  const [isShowModelDelete, setShowModelDelete] = useState(false);
  const [dataUserDelete, setDataUserDelete] = useState({});

  useEffect(() => {
    // call APIs
    getUsers(1);
  }, []);

  const getUsers = async (page) => {
    let res = await fetchAllUser(page);
    if (res && res.data) {
      setTotalPages(res.total_pages);
      setTotalUsers(res.total);
      setUserlist(res.data);
    }
  };

  const handlePageClick = (event) => {
    getUsers(+event.selected + 1);
  };

  const handleShow = () => setShowModelAddNew(true);
  const handleClose = () => {
    setShowModelAddNew(false);
    setShowModelEditUser(false);
    setShowModelDelete(false);
  };

  const handleUpdateTable = (user) => {
    setUserlist([user, ...userlist]);
  };

  const handleEditUser = (user) => {
    setDataUserEdit(user);
    setShowModelEditUser(true);
  };

  const handleEditUserFormModal = (user) => {
    let cloneUserList = _.cloneDeep(userlist);
    let index = userlist.findIndex((item) => item.id === user.id);
    cloneUserList[index].first_name = user.first_name;
    setUserlist(cloneUserList);
  };

  const handleDeleteUser = (user) => {
    setShowModelDelete(true);
    setDataUserDelete(user);
  };

  const handleConfirmDeleteUser = (user) => {
    let newUserList = userlist.filter((item) => item.id !== user.id);
    setUserlist(newUserList);
  };

  return (
    <>
      <div className="my-3 add-new">
        <span>
          <b>List Users:</b>
        </span>
        <button className="btn btn-success" onClick={handleShow}>
          Add new user
        </button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userlist &&
            userlist.length > 0 &&
            userlist.map((user, index) => {
              return (
                <>
                  <tr key={`user-${index}`}>
                    <td>{user.id}</td>
                    <td>{user.email}</td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>
                      <button
                        className="btn btn-warning me-3"
                        onClick={() => handleEditUser(user)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteUser(user)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
        </tbody>
      </Table>

      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />

      <ModalAddNew
        isShowModelAddNew={isShowModelAddNew}
        handleClose={handleClose}
        handleUpdateTable={handleUpdateTable}
      />

      <ModalEditUser
        isShowModelEditUser={isShowModelEditUser}
        handleClose={handleClose}
        dataUserEdit={dataUserEdit}
        handleEditUserFormModal={handleEditUserFormModal}
      />

      <ModalConfirm
        isShowModelDelete={isShowModelDelete}
        handleClose={handleClose}
        dataUserDelete={dataUserDelete}
        handleConfirmDeleteUser={handleConfirmDeleteUser}
      />
    </>
  );
};

export default TableUsers;
