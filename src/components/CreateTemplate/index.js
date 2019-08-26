import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import CreateTemplateForm from "./CreateTemplateForm";
import config from "../../config.json";

class CreateTemplate extends Component {
  constructor() {
    super();
    this.state = {
      success: null,
      error: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit = values => {
    const token = localStorage.getItem("token");
    if (!token) {
      this.props.history.push("/login");
      return;
    }
    const data = {
      "import-url": values.url
    };
    fetch(`${config.BACKEND_DOMAIN}api/v1/templates/`, {
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
          this.setState({ success: body.template_success, error: [] });
        } else {
          this.setState({ error: body, success: null });
        }
      });
  };
  render() {
    return (
      <main>
        <Header />
        <CreateTemplateForm
          error={this.state.error}
          success={this.state.success}
          handleSubmit={this.handleSubmit}
        />
        <Footer />
      </main>
    );
  }
}

CreateTemplate = withRouter(CreateTemplate);
export default CreateTemplate;
