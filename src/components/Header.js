import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import SungasLogo from "../assets/imgs/logo/sungas";

const Header = (props) => {
  return (
    <>
      <Navbar expand="lg" bg="light" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">
            <SungasLogo />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" activeKey={"/users"}>
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/users">Manage Users</Nav.Link>
              <NavDropdown title="Setting" id="basic-nav-dropdown">
                <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
