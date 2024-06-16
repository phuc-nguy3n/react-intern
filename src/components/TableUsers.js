import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../services/userService";
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNew";
import ModalEditUser from "./ModalEditUser";
import ModalConfirm from "./ModalConfirm";
import _, { debounce } from "lodash";
import { CSVLink } from "react-csv";
import { toast } from "react-toastify";
import "./TableUsers.scss";
import "react-toastify/dist/ReactToastify.css";
import Papa from "papaparse";

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

  const [dataExport, setDataExport] = useState([]);

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

  const getUsersExport = (event, done) => {
    let result = [];
    if (userlist && userlist.length > 0) {
      result.push(["Id", "Email", "First name", "Last name"]);
      userlist.map((item) => {
        let arr = [];
        arr[0] = item.id;
        arr[1] = item.email;
        arr[2] = item.first_name;
        arr[3] = item.last_name;
        result.push(arr);
      });

      setDataExport(result);
      done();
    }
  };

  const handleImportCSV = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      if (file.type !== "text/csv") {
        toast.error("Please import csv file format!");
        return;
      }

      Papa.parse(file, {
        // header: true,
        complete: function (results) {
          let rawCSV = results.data;
          if (rawCSV.length > 0) {
            if (rawCSV[0] && rawCSV[0].length === 3) {
              if (
                rawCSV[0][0] !== "email" ||
                rawCSV[0][1] !== "first_name" ||
                rawCSV[0][2] !== "last_name"
              ) {
                toast.error("Wrong format header csv file!");
              } else {
                let result = [];

                rawCSV.forEach((item, index) => {
                  if (index > 0 && item.length === 3) {
                    let obj = {};
                    obj.email = item[0];
                    obj.first_name = item[1];
                    obj.last_name = item[2];

                    result.push(obj);
                  }
                });

                setUserlist(result);
              }
            } else {
              toast.error("Wrong format csv file!");
            }
          } else {
            toast.error("Not find data on csv file!");
          }

          event.target.value = null;
        },
      });
    }
  };

  return (
    <>
      <div className="my-3 add-new d-sm-flex">
        <span>
          <b>List Users:</b>
        </span>
        <div className="group-btns mt-sm-0 mt-2">
          <input
            id="import"
            type="file"
            hidden
            onChange={(event) => handleImportCSV(event)}
          ></input>
          <label htmlFor="import" className="btn btn-warning">
            <i className="fa-solid fa-upload"></i>
            <span> Import</span>
          </label>
          <CSVLink
            filename={"users.csv"}
            className="btn btn-primary"
            data={dataExport}
            asyncOnClick={true}
            onClick={getUsersExport}
          >
            <i className="fa-solid fa-download"></i>
            <span> Export</span>
          </CSVLink>
          <button className="btn btn-success" onClick={handleShow}>
            <i className="fa-solid fa-circle-plus"></i> Add new
          </button>
        </div>
      </div>

      <div className="col-sm-4 my-3">
        <input
          className="form-control"
          placeholder="Search user by email..."
          onChange={(event) => handleSearch(event)}
        />
      </div>

      <div className="customize-table">
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
            {userlist && userlist.length > 0 ? (
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
                          className="btn btn-warning me-md-3 btn-edit"
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
              })
            ) : (
              <tr>
                <td className="text-center fs-5" colSpan="5">
                  There are no users in the table
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      <ReactPaginate
        className="customize-pagination"
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="<"
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
