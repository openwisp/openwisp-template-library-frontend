import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import "./header.css";

const Header = () => {
  const key = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  return (
    <div>
      <header>
        <Navbar expand="md" bg="dark">
          <Navbar.Brand href="/" className="text-white hover mr-auto">
            Template Library
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {key ? (
                <Nav.Link href="/create-template" className="hover text-white">
                  Create Template
                </Nav.Link>
              ) : null}
              {key ? (
                <Nav.Link
                  href={user ? "/user" : null}
                  className="hover text-white"
                >
                  {user ? user : null}
                </Nav.Link>
              ) : null}
              <Nav.Link
                href={key ? "/logout" : "/register"}
                className="hover text-white"
              >
                {key ? "Logout" : "register"}
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
