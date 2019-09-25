import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router-dom";
import config from "../../config.json";

class Logout extends Component {
  constructor() {
    super();
    this.state = {
      key: localStorage.getItem("token")
    };
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout = () => {
    if (this.state.key) {
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
          this.setState({ key: null });
        });
    }
  };
  render() {
    return (
      <div>
        {this.handleLogout()}
        {this.state.key ? null : <Redirect to="/" />}
      </div>
    );
  }
}
Logout = withRouter(Logout);
export default Logout;
