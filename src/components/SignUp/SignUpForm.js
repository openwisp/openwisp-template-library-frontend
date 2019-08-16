import React from "react";
import { Formik } from "formik";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import "../../index.css";

const SignUpForm = props => {
  const schema = Yup.object({
    username: Yup.string().required(),
    email: Yup.string()
      .email()
      .required(),
    password: Yup.string()
      .required()
      .min(8)
      .matches(/(?=.*[0-9])/),
    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    )
  });
  return (
    <div>
      <div className="container">
        <h1>SignUp</h1>
        <hr />
        <Formik
          validationSchema={schema}
          onSubmit={props.handleSubmit}
          initialValues={{
            username: "",
            email: "",
            password: "",
            passwordConfirmation: ""
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
                {props.error.username ? props.error.username : null}
              </p>
              <p className="text-danger">
                {props.error.email ? props.error.email : null}
              </p>
              <p className="text-success">
                {props.success ? props.success : null}
              </p>
              <p className="text-right">
                Have an account? <Link to="/login">login</Link>
              </p>
              <Form.Group controlId="username">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter username"
                  isInvalid={errors.username && touched.username}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </Form.Group>
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
              <Form.Group controlId="password">
                <Form.Label>password:</Form.Label>
                <Form.Control
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={errors.password && touched.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="passwordConfirmation">
                <Form.Label>Password Confirmation:</Form.Label>
                <Form.Control
                  type="password"
                  value={values.passwordConfirmation}
                  onChange={handleChange}
                  isInvalid={
                    errors.passwordConfirmation && touched.passwordConfirmation
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {errors.passwordConfirmation}
                </Form.Control.Feedback>
              </Form.Group>
              <br />
              <Button type="submit" className="button">
                signUp
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUpForm;
