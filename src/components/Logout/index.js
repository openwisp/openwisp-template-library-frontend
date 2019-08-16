import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router-dom";
import config from "../../config.json";

class Logout extends Component {
  constructor() {
    super();
    this.state = {
      user: localStorage.getItem("user")
    };
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout = () => {
    const user = localStorage.getItem("user");
    if (user) {
      fetch(`${config.BACKEND_DOMAIN}rest-auth/logout/`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(() => {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          this.setState({ user: null });
        });
    }
  };
  render() {
    return (
      <div>
        {this.handleLogout()}
        {this.state.user ? null : <Redirect to="/" />}
      </div>
    );
  }
}
Logout = withRouter(Logout);
export default Logout;
