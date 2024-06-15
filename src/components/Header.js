import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import SungasLogo from "../assets/imgs/logo/sungas";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Header = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { hiden, setHiden } = props;
  const { isLoggedIn, setIsLoggedIn } = props;
  const { user, logout } = useContext(UserContext);

  const goToLoginPage = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    goToLoginPage();
    toast.success("Log out successfully!");
  };

  return (
    <>
      <Navbar expand="lg" bg="light" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">
            <SungasLogo />
          </Navbar.Brand>

          {hiden === false && (
            <div className="d-flex">
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
            </div>
          )}

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" activeKey={location.pathname}>
              {user && user.email !== "" && (
                <div className="welcome d-none-cus-2 py-1 px-0">
                  Welcome &nbsp; <b>{user.email}</b>
                </div>
              )}

              {isLoggedIn && (
                <>
                  <NavLink className="nav-link" to="/">
                    Home
                  </NavLink>

                  <NavLink className="nav-link" to="/users">
                    Manage Users
                  </NavLink>
                </>
              )}
            </Nav>
            <Nav>
              {user && user.email !== "" && (
                <div className="welcome d-none-cus">
                  Welcome &nbsp; <b>{user.email}</b>
                </div>
              )}

              {hiden === false && (
                <NavDropdown title="Setting" id="basic-nav-dropdown">
                  {isLoggedIn ? (
                    <NavDropdown.Item onClick={() => handleLogout()}>
                      Logout
                    </NavDropdown.Item>
                  ) : (
                    <NavLink
                      onClick={() => setHiden(true)}
                      className="dropdown-item"
                      to="/login"
                    >
                      Login
                    </NavLink>
                  )}
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
