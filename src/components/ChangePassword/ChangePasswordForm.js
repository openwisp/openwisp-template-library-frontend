import React from "react";
import { Formik } from "formik";
import { Form, Button } from "react-bootstrap";
import * as Yup from "yup";
import "../../index.css";

const ChangePasswordForm = props => {
  const schema = Yup.object({
    new_password1: Yup.string()
      .required("This field is required")
      .min(8)
      .matches(/(?=.*[0-9])/),
    new_password2: Yup.string().oneOf(
      [Yup.ref("new_password1"), null],
      "Passwords must match"
    )
  });
  return (
    <div>
      <div className="container">
        <h1>Change password</h1>
        <hr />
        <Formik
          validationSchema={schema}
          onSubmit={props.handleSubmit}
          initialValues={{
            new_password1: "",
            new_password2: ""
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
              <p className="text-success">{props.success || null}</p>
              <p className="text-danger">
                {props.error.length === 0 ? null : props.error.toString()}
              </p>
              <Form.Group controlId="new_password1">
                <Form.Label>New Password:</Form.Label>
                <Form.Control
                  type="password"
                  name="new_password1"
                  value={values.new_password1}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={errors.new_password1 && touched.new_password1}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.new_password1}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="new_password2">
                <Form.Label>Confirm Password:</Form.Label>
                <Form.Control
                  type="password"
                  name="new_password2"
                  value={values.new_password2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={errors.new_password2 && touched.new_password2}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.new_password2}
                </Form.Control.Feedback>
              </Form.Group>
              <br />
              <Button type="submit" className="text-right button">
                Change password
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
