import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import LoginForm from "./Login";
import PropTypes from "prop-types";
import config from "../../config.json";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      error: null
    };
    this.googleResponse = this.googleResponse.bind(this);
    this.facebookResponse = this.facebookResponse.bind(this);
    this.onFailure = this.onFailure.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  static propTypes = {
    history: PropTypes.object.isRequired
  };
  facebookResponse = async event => {
    const data = {
      access_token: event.accessToken
    };
    const response = await fetch(
      `${config.BACKEND_DOMAIN}rest-auth/facebook/`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(data)
      }
    );
    try {
      if (response && response.status === 200) {
        const json_data = await response.json();
        localStorage.setItem("token", json_data.key);
        this.setState({ error: null });
        this.props.history.push("/");
      } else {
        const error_data = await response.json();
        this.setState({ error: error_data });
      }
    } catch (error) {
      this.setState({
        error: "A Server error occurred. Please try again later"
      });
      console.warn(error);
    }
  };
  googleResponse = async event => {
    const data = {
      access_token: event.accessToken
    };
    const response = await fetch(`${config.BACKEND_DOMAIN}rest-auth/google/`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    try {
      if (response && response.status === 200) {
        const json_data = await response.json();
        localStorage.setItem("token", json_data.key);
        this.setState({ error: null });
        this.props.history.push("/");
      } else {
        const error = await response.json();
        this.setState({ error: error });
      }
    } catch (error) {
      this.setState({
        error: "A Server error occurred. Please try again later"
      });
      console.warn(error);
    }
  };
  onFailure = error => {
    this.setState({ error: error });
  };
  handleSubmit = async values => {
    const data = {
      username: values.lusername,
      password: values.lpassword
    };
    const response = await fetch(`${config.BACKEND_DOMAIN}rest-auth/login/`, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(data)
    });
    try {
      if (response && response.status === 200) {
        const json_data = await response.json();
        localStorage.setItem("token", json_data.key);
        localStorage.setItem("user", data.username);
        this.setState({ error: null });
        this.props.history.push("/");
      } else {
        const error = await response.json();
        this.setState({ error: error });
      }
    } catch (error) {
      this.setState({
        error: "A server error occurred. Please try again later"
      });
      console.warn(error);
    }
  };

  render() {
    return (
      <LoginForm
        googleResponse={this.googleResponse}
        facebookResponse={this.facebookResponse}
        handleSubmit={this.handleSubmit}
        error={this.state.error}
      />
    );
  }
}

Login = withRouter(Login);
export default Login;
