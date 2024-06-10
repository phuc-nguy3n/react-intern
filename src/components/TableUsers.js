import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../services/userService";
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNew";
import ModalEditUser from "./ModalEditUser";
import ModalConfirm from "./ModalConfirm";
import _, { debounce } from "lodash";
import "./TableUsers.scss";

const TableUsers = (props) => {
  const [userlist, setUserlist] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [isShowModelAddNew, setShowModelAddNew] = useState(false);

  const [isShowModelEditUser, setShowModelEditUser] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState({});

  const [isShowModelDelete, setShowModelDelete] = useState(false);
  const [dataUserDelete, setDataUserDelete] = useState({});

  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    // call APIs
    getUsers(pageNumber);
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
    setPageNumber(+event.selected + 1);
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

  const handleSort = (sortBy, sortField) => {
    let cloneUserList = _.cloneDeep(userlist);
    cloneUserList = _.orderBy(cloneUserList, [sortField], [sortBy]);

    setUserlist(cloneUserList);
  };

  const handleSearch = debounce((event) => {
    let term = event.target.value;
    if (term) {
      let cloneUserList = _.cloneDeep(userlist);
      cloneUserList = cloneUserList.filter((item) => item.email.includes(term));
      setUserlist(cloneUserList);
    } else {
      getUsers(pageNumber);
    }
  }, 500);

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

      <div className="col-4 my-3">
        <input
          className="form-control"
          placeholder="Search user by email..."
          onChange={(event) => handleSearch(event)}
        />
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <div className="sort-header">
                <span>ID</span>
                <span>
                  <i
                    className="fa-solid fa-arrow-down-long"
                    onClick={() => handleSort("desc", "id")}
                  ></i>
                  <i
                    className="fa-solid fa-arrow-up-long"
                    onClick={() => handleSort("asc", "id")}
                  ></i>
                </span>
              </div>
            </th>
            <th>Email</th>
            <th>
              <div className="sort-header">
                <span>First Name</span>
                <span>
                  <i
                    className="fa-solid fa-arrow-down-long"
                    onClick={() => handleSort("desc", "first_name")}
                  ></i>
                  <i
                    className="fa-solid fa-arrow-up-long"
                    onClick={() => handleSort("asc", "first_name")}
                  ></i>
                </span>
              </div>
            </th>
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
