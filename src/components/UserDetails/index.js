import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Header from "../Header";
import Footer from "../Footer";
import UserDetailsForm from "./UserDetailsForm";
import config from "../../config.json";

class UserDetails extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      success: null,
      error: []
    };
    this.handleUpdate = this.handleUpdate.bind(this);
  }
  static propTypes = {
    history: PropTypes.object.isRequired
  };
  componentDidMount = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      this.props.history.push("/login");
      return;
    }
    fetch(`${config.BACKEND_DOMAIN}rest-auth/user/`, {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: "Token " + token,
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(response => response.json())
      .then(body => {
        this.setState({
          username: body.username,
          first_name: body.first_name,
          last_name: body.last_name,
          email: body.email
        });
      });
  };

  handleUpdate = values => {
    const data = {
      username: values.username,
      first_name: values.first_name,
      last_name: values.last_name
    };
    const token = localStorage.getItem("token");
    fetch(`${config.BACKEND_DOMAIN}rest-auth/user/`, {
      method: "PUT",
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
          localStorage.setItem("user", body.username);
          this.setState({
            success: "User details successfully updated",
            error: []
          });
        } else {
          this.setState({ error: body, success: null });
        }
      });
  };
  render() {
    return (
      <main>
        <Header />
        {this.state.username ? (
          <UserDetailsForm
            username={this.state.username}
            first_name={this.state.first_name}
            last_name={this.state.last_name}
            email={this.state.email}
            success={this.state.success}
            handleUpdate={this.handleUpdate}
            error={this.state.error}
          />
        ) : null}
        <Footer />
      </main>
    );
  }
}

UserDetails = withRouter(UserDetails);
export default UserDetails;
