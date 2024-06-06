import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../services/userService";

const TableUsers = (props) => {
  const [userlist, setUserlist] = useState([]);

  useEffect(() => {
    // call APIs
    getUsers();
  }, []);

  const getUsers = async () => {
    let res = await fetchAllUser();

    if (res && res.data && res.data.data) {
      setUserlist(res.data.data);
    }
  };

  console.log(">>> Check userlist: ", userlist);

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
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
                  </tr>
                </>
              );
            })}
        </tbody>
      </Table>
    </>
  );
};

export default TableUsers;
