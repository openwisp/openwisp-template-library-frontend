import React, { Component } from "react";
import Header from "../Header";
import Footer from "../Footer";
import SignUpForm from "./SignUpForm";
import config from "../../config.json";

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      error: [],
      success: null
    };
  }
  handleSubmit = values => {
    const data = {
      username: values.username,
      email: values.email,
      password1: values.password,
      password2: values.passwordConfirmation
    };
    fetch(`${config.BACKEND_DOMAIN}rest-auth/registration/`, {
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
          this.setState({ success: body.detail, error: [] });
        } else {
          this.setState({ error: body, success: null });
        }
      });
  };
  render() {
    return (
      <div>
        <Header />
        <SignUpForm
          handleSubmit={this.handleSubmit}
          error={this.state.error}
          success={this.state.success}
        />
        <Footer />
      </div>
    );
  }
}

export default SignUp;
