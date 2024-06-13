import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import SungasLogo from "../assets/imgs/logo/sungas";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = (props) => {
  const { isLoggedIn, setIsLoggedIn } = props;

  const location = useLocation();
  const navigate = useNavigate();

  const goToLoginPage = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
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
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" activeKey={location.pathname}>
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>

              <NavLink className="nav-link" to="/users">
                Manage Users
              </NavLink>
            </Nav>
            <Nav>
              <NavDropdown title="Setting" id="basic-nav-dropdown">
                {isLoggedIn ? (
                  <NavDropdown.Item onClick={() => handleLogout()}>
                    Logout
                  </NavDropdown.Item>
                ) : (
                  <NavLink className="dropdown-item" to="/login">
                    Login
                  </NavLink>
                )}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
