import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
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
  facebookResponse = event => {
    const data = {
      access_token: event.accessToken
    };
    fetch(`${config.BACKEND_DOMAIN}rest-auth/facebook/`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(json => {
        localStorage.setItem("token", json.key);
        localStorage.setItem("user", event.first_name);
        this.setState({ error: null });
        this.props.history.push("/");
      })
      .catch(error =>
        this.setState({ error: "could not login you in. please try again" })
      );
  };
  googleResponse = event => {
    const data = {
      access_token: event.accessToken
    };
    fetch(`${config.BACKEND_DOMAIN}rest-auth/google/`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        localStorage.setItem("token", json.key);
        localStorage.setItem("user", event.profileObj.givenName);
        this.setState({ error: null });
        this.props.history.push("/");
      })
      .catch(error =>
        this.setState({ error: "could not login you in. please try again" })
      );
  };
  onFailure = error => {
    this.setState({ error: error });
  };
  handleSubmit = values => {
    const data = {
      username: values.username,
      password: values.password
    };
    fetch(`${config.BACKEND_DOMAIN}rest-auth/login/`, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        return Promise.all([response.ok, response.json()]);
      })
      .then(([responseOk, body]) => {
        if (responseOk) {
          localStorage.setItem("token", body.key);
          localStorage.setItem("user", data.username);
          this.setState({ error: null });
          this.props.history.push("/");
        } else {
          this.setState({ error: body });
        }
      });
  };

  render() {
    return (
      <main>
        <Header />
        <LoginForm
          googleResponse={this.googleResponse}
          facebookResponse={this.facebookResponse}
          handleSubmit={this.handleSubmit}
          error={this.state.error}
        />
        <Footer />
      </main>
    );
  }
}

Login = withRouter(Login);
export default Login;
