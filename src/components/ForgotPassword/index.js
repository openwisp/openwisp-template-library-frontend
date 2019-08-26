import React, { Component } from "react";
import Header from "../Header";
import Footer from "../Footer";
import ForgotPasswordForm from "./ForgotPasswordForm";
import config from "../../config.json";

class ForgotPassword extends Component {
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
      email: values.email
    };
    fetch(`${config.BACKEND_DOMAIN}rest-auth/password/reset/`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
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
        <ForgotPasswordForm
          success={this.state.success}
          error={this.state.error}
          handleSubmit={this.handleSubmit}
        />
        <Footer />
      </main>
    );
  }
}

export default ForgotPassword;
