import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import TemplateDetailsForm from "./TemplateDetailsForm";
import config from "../../config.json";

class TemplateDetails extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      subscription_count: 0,
      unsubscription_count: 0
    };
    this.getSubscriptions = this.getSubscriptions.bind(this);
  }
  componentDidMount() {
    fetch(
      `${config.BACKEND_DOMAIN}api/v1/templates/${this.props.match.params.id}/`,
      {
        mode: "cors",
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(json => {
        const cutOffIndex = json.url.indexOf("templates");
        const url = json.url.substring(0, cutOffIndex);
        this.getSubscriptions(url);
        this.setState({ data: json });
      });
  }
  getSubscriptions = url => {
    fetch(
      `${url}subscription/?template=${this.props.match.params.id}&&status=True`,
      {
        mode: "cors",
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => {
        return response.json();
      })
      .then(json => this.setState({ subscription_count: json.count }));
    fetch(
      `${url}subscription/?template=${
        this.props.match.params.id
      }&&status=False`,
      {
        mode: "cors",
        method: "GET"
      }
    )
      .then(response => response.json())
      .then(json => this.setState({ unsubscription_count: json.count }));
  };
  render() {
    return (
      <main>
        <Header />
        <TemplateDetailsForm
          organization={this.state.data.organization}
          template={this.state.data}
          subscription={this.state.subscription_count}
          unsubscription={this.state.unsubscription_count}
        />
        <Footer />
      </main>
    );
  }
}

TemplateDetails = withRouter(TemplateDetails);
export default TemplateDetails;
