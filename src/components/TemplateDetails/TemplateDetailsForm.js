import React from "react";
import { Card, Form, Badge, ListGroup, ListGroupItem } from "react-bootstrap";

const TemplateDetailsForm = props => {
  if (props.organization) {
    return (
      <section className="container">
        <h1>Template Details</h1>
        <hr />
        <Card>
          <Card.Header as="h3">{props.template.name}</Card.Header>
          <Card.Body>
            <br />
            <ListGroup>
              <ListGroupItem>
                <p>
                  Subscriptions{" "}
                  <Badge pill variant="info">
                    {props.subscription}
                  </Badge>
                </p>
                <p>
                  UnSubscriptions{" "}
                  <Badge pill variant="danger">
                    {props.unsubscription}
                  </Badge>
                </p>
              </ListGroupItem>
              <ListGroupItem>
                <p>Description:</p>
                <Card.Text>{props.template.description}</Card.Text>
              </ListGroupItem>
              <ListGroupItem>
                <p>
                  Organization:
                  {"   "}
                  {props.organization.name}
                </p>
              </ListGroupItem>
              <ListGroupItem>
                <Form.Control readOnly value={props.template.url} />
              </ListGroupItem>
            </ListGroup>
          </Card.Body>
        </Card>
      </section>
    );
  } else {
    return <span />;
  }
};

export default TemplateDetailsForm;
