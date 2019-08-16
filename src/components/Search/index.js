import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Form, Row, Col } from "react-bootstrap";
import "../../index.css";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      org: "",
      des: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }
  static propTypes = {
    history: PropTypes.object.isRequired
  };
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  handleSubmit = () => {
    this.props.history.push({
      pathname: "/",
      search: this.getURL()
    });
  };
  getURL = () => {
    const name = this.state.name ? this.state.name : "";
    const org = this.state.org ? this.state.org : "";
    const des = this.state.des ? this.state.des : "";
    const url = `?name=${name}&&org=${org}&&des=${des}`;
    return url;
  };
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Row>
          <Col>
            <Form.Control
              type="text"
              value={this.state.name}
              name="name"
              placeholder="Search by name"
              onChange={this.handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              type="text"
              value={this.state.org}
              name="org"
              placeholder="Search by organization"
              onChange={this.handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              type="text"
              value={this.state.des}
              name="des"
              placeholder="Search by description"
              onChange={this.handleChange}
            />
          </Col>
          <Col>
            <button className="btn button">Search</button>
          </Col>
        </Row>
      </Form>
    );
  }
}

Search = withRouter(Search);
export default Search;
