import React from "react";
import { Card, Button } from "react-bootstrap";
import "../../index.css";

const ListTemplateForm = props => {
  return (
    <section>
      <Card>
        <Card.Header as="h2">{props.name}</Card.Header>
        <Card.Body>
          <Card.Text>
            {props.description
              ? props.description.length >= 200
                ? `${props.description.substring(0, 201)}...`
                : props.description
              : null}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button className="button" href={`/template/${props.id}`} block>
            View more
          </Button>
        </Card.Footer>
      </Card>
    </section>
  );
};

export default ListTemplateForm;
