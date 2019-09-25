import React from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import {
  Card,
  Form,
  Badge,
  ListGroup,
  ListGroupItem,
  Tabs,
  Tab
} from "react-bootstrap";

const TemplateDetailsForm = props => {
  if (props.organization) {
    return (
      <section className="container">
        <h1>Template Details</h1>
        <hr />
        <Card style={{ width: "50rem" }} className="mx-auto">
          <Card.Header as="h3">{props.template.name}</Card.Header>
          <Card.Body>
            <br />
            <Tabs defaultActiveKey="template" id="template-details">
              <Tab eventKey="template" title="Template">
                <br />
                <br />
                <ListGroup>
                  <ListGroupItem>
                    <p>
                      <span className="flaot-left">
                        <FaThumbsUp style={{ color: "blue" }} />
                        <Badge pill variant="info">
                          {props.subscription}
                        </Badge>
                      </span>
                      <span className="float-right">
                        <FaThumbsDown style={{ color: "light-red" }} />
                        <Badge pill variant="danger">
                          {props.unsubscription}
                        </Badge>
                      </span>
                    </p>
                    <br />
                    <br />
                    <Card.Text>{props.template.description}</Card.Text>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Form.Control readOnly value={props.template.url} />
                  </ListGroupItem>
                </ListGroup>
              </Tab>
              <Tab eventKey="owner" title="Owner">
                <br />
                <br />
                <br />
                <hr />
                <Card.Text>
                  <p>Organization name: {props.organization.name}</p>
                  <br />
                  <p>{props.organization.description}</p>
                </Card.Text>
              </Tab>
            </Tabs>
          </Card.Body>
        </Card>
      </section>
    );
  } else {
    return <span />;
  }
};

export default TemplateDetailsForm;
