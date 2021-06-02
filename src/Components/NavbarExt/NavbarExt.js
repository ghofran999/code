import React from "react";
import { useHistory } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import "./NavbarExt.css";

function NavbarExt() {
  const history = useHistory();
  return (
    <div className="homepage-navbar">
      <Navbar className="color-nav" variant="dark">
        <Navbar.Brand>Hot heatmapper</Navbar.Brand>

        <Nav className="mr-auto">
          <span
            onClick={() => {
              history.push("/");
            }}
          >
            Home
          </span>
          <span
            onClick={() => {
              history.push("/login");
            }}
          >
            Login
          </span>
          <span
            onClick={() => {
              history.push("/signup");
            }}
          >
            Sign UP
          </span>
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavbarExt;
