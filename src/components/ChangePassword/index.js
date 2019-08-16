import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import ChangePasswordForm from "./ChangePasswordForm";
import config from "../../config.json";

class ChangePassword extends Component {
  constructor() {
    super();
    this.state = {
      success: null,
      error: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit = values => {
    const data = {
      new_password1: values.new_password1,
      new_password2: values.new_password2
    };
    const token = localStorage.getItem("token");
    if (!token) {
      this.props.history.push("/login");
      return;
    }
    fetch(`${config.BACKEND_DOMAIN}rest-auth/password/change/`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + token
      },
      body: JSON.stringify(data)
    })
      .then(response => Promise.all([response.ok, response.json()]))
      .then(([responseOk, body]) => {
        if (responseOk) {
          this.setState({ success: body.detail });
        } else {
          this.setState({ error: body });
        }
      });
  };
  render() {
    return (
      <main>
        <Header />
        <ChangePasswordForm
          success={this.state.success}
          error={this.state.error}
          handleSubmit={this.handleSubmit}
        />
        <Footer />
      </main>
    );
  }
}

ChangePassword = withRouter(ChangePassword);
export default ChangePassword;
