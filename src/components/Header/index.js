import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import logo from "./logo.svg";
import "./header.css";

const Header = () => {
  const user = localStorage.getItem("user");
  return (
    <div className="header">
      <header>
        <Navbar expand="md" bg="dark">
          <Navbar.Brand href="/">
            <img
              src={logo}
              width="100"
              height="50"
              alt="OpenWisp logo"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/" className="text-white hover">
              Home
            </Nav.Link>
          </Nav>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {user ? (
                <Nav.Link href="/create-template" className="hover text-white">
                  Create Template
                </Nav.Link>
              ) : null}
              <Nav.Link
                href={user ? "/user" : "/login"}
                className="hover text-white"
              >
                {user ? user : "Login"}
              </Nav.Link>
              <Nav.Link
                href={user ? "/logout" : "/signup"}
                className="hover text-white"
              >
                {user ? "Logout" : "Signup"}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
      <div>
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default Header;
