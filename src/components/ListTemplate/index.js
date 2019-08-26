import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import NotFound from "../NotFound";
import ListTemplateForm from "./ListTemplateForm";
import Header from "../Header";
import Footer from "../Footer";
import Search from "../Search";
import { Container, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import config from "../../config.json";

class ListTemplate extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }
  static propTypes = {
    location: PropTypes.object.isRequired
  };
  componentDidMount() {
    const defaultUrl = `${config.BACKEND_DOMAIN}api/v1/templates/`;
    const url = this.props.location.search
      ? defaultUrl + this.props.location.search
      : defaultUrl;
    fetch(url)
      .then(response => response.json())
      .then(body => this.setState({ data: body }));
  }
  render() {
    const data = this.state.data;
    const listTemplates =
      data.length === 0 ? (
        <NotFound />
      ) : (
        data.map(element => {
          return (
            <Col md={6} lg={6} sm={6} xl={6} xs={12} key={element.id}>
              <ListTemplateForm
                description={element.description}
                key={element.id}
                name={element.name}
                id={element.id}
              />
              <br />
              <br />
            </Col>
          );
        })
      );
    return (
      <main>
        <Header />
        <div className="container">
          <hr />
          <Search />
          <br />
          <br />
          <Container>
            <Row>{listTemplates}</Row>
          </Container>
        </div>
        <Footer />
      </main>
    );
  }
}

ListTemplate = withRouter(ListTemplate);

export default ListTemplate;
