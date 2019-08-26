import React from "react";
import { Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import "../../index.css";

const ForgotPasswordForm = props => {
  const schema = Yup.object({
    email: Yup.string()
      .email()
      .required()
  });
  return (
    <div className="container">
      <h1>Reset Password</h1>
      <hr />
      <Formik
        validationSchema={schema}
        onSubmit={props.handleSubmit}
        initialValues={{
          email: ""
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
            <p className="text-danger">
              {props.error.length === 0 ? null : props.error.toString()}
            </p>
            <p className="text-success">
              {props.success ? props.success : null}
            </p>
            <Form.Group controlId="email">
              <Form.Label>email:</Form.Label>
              <Form.Control
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your email address"
                isInvalid={errors.email && touched.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Button type="submit" className="text-right button">
              Reset password
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ForgotPasswordForm;
