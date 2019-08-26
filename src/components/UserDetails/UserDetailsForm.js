import React from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import { Form, Button } from "react-bootstrap";
import * as Yup from "yup";
import "../../index.css";

const UserDetailsForm = props => {
  const schema = Yup.object({
    username: Yup.string().required(),
    first_name: Yup.string(),
    last_name: Yup.string()
  });
  return (
    <div>
      <div className="container">
        <h1>User Details</h1>
        <hr />
        <Formik
          validationSchema={schema}
          onSubmit={props.handleUpdate}
          initialValues={{
            username: props.username,
            email: props.email,
            first_name: props.first_name,
            last_name: props.last_name
          }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            errors
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <p className="text-danger">{props.error.username || null}</p>
              <p className="text-success">{props.success}</p>
              <p className="text-right">
                <Link to="/change-password">Change password</Link>
              </p>
              <Form.Group controlId="username">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={errors.username && touched.username}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="first_name">
                <Form.Label>First Name:</Form.Label>
                <Form.Control
                  type="text"
                  value={values.first_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={errors.first_name && touched.first_name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.first_name}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="last_name">
                <Form.Label>Last Name:</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={values.last_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={errors.last_name && touched.last_name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.last_name}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>email:</Form.Label>
                <Form.Control
                  type="email"
                  defaultValue={values.email}
                  readOnly
                />
              </Form.Group>

              <br />
              <Button type="submit" variant="primary" className="button">
                Save
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UserDetailsForm;
