import React from "react";
import { useHistory } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import '../Admin/admin.css';
function NavbarUser() {
  const history = useHistory();
  return (
    <Navbar className="color-nav" variant="dark">
      <Navbar.Brand>Hot heatmapper</Navbar.Brand>

      <Nav className="mr-auto">
        <span className="mr-3 ml-3 pointer"
          onClick={() => {
            history.push("/dashboard");
          }}
        >
          Home
        </span>
        <span className="mr-3 ml-3 pointer"
          onClick={() => {
            history.push("/dashboard/create");
          }}
        >
          Create Heatmap
        </span>
        <span className="mr-3 ml-3 pointer"
          onClick={() => {
            history.push("/dashboard/list");
          }}
        >
          My Heatmaps
        </span>
        <span className="mr-3 ml-3 pointer" 
          onClick={() => {
            window.sessionStorage.removeItem("id_token");
            window.sessionStorage.removeItem("email");
            window.sessionStorage.removeItem("role");
            window.location.reload();
          }}
        >
          Deconnexion
        </span>
      </Nav>
    </Navbar>
  );
}

export default NavbarUser;
