import React from "react";
import { useHistory } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

function NavbarAdmin() {
  const history = useHistory();
  return (
    <div className="homepage-navbar">
      <Navbar className="color-nav" variant="dark">
        <Navbar.Brand>Hot heatmapper</Navbar.Brand>

        <Nav className="mr-auto">
          <span
            onClick={() => {
              history.push("/dashboard");
            }}
          >
            Home
          </span>
          <span
            onClick={() => {
              history.push("/dashboard/listmaps");
            }}
          >
            Heatmaps
          </span>
          <span
            onClick={() => {
              history.push("/dashboard/listusers");
            }}
          >
            Users
          </span>
          <span
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
    </div>
  );
}

export default NavbarAdmin;
