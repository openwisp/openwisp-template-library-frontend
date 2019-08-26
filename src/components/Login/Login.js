import React from "react";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";
import { Formik } from "formik";
import { Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import "./Login.css";
import "../../index.css";
import config from "../../config.json";

const LoginForm = props => {
  const schema = Yup.object({
    username: Yup.string().required(),
    password: Yup.string().required()
  });
  return (
    <div>
      <div className="container">
        <h1>Login</h1>
        <hr />
        <Card style={{ width: "30rem" }} className="mx-auto">
          <br />
          <div className="social">
            <FacebookLogin
              appId={config.FACEBOOK_APP_ID}
              autoLoad={false}
              fields="public_profile, email, name, first_name, last_name"
              scope="public_profile"
              callback={props.facebookResponse}
              icon="fa-facebook"
              textButton="Login"
            />
            <span className="google">
              <GoogleLogin
                clientId={config.GOOGLE_CLIENT_ID}
                buttonText="Login"
                onSuccess={props.googleResponse}
                onFailure={props.onFailure}
              />
            </span>
          </div>
          <br />
          <Formik
            validationSchema={schema}
            onSubmit={props.handleSubmit}
            initialValues={{
              username: "",
              password: ""
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
                <div className="input">
                  <p className="text-danger">
                    {props.error ? props.error.non_field_errors : null}
                  </p>
                  <p className="text-right">
                    Create an <Link to="/signup">account</Link>?
                  </p>
                  <Form.Group controlId="username">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter username"
                      isInvalid={!!errors.username && touched.username}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.username}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="password">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter password"
                      isInvalid={!!errors.password && touched.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <br />
                  <p>
                    <Link to="/forget-password">Forgot password?</Link>
                  </p>
                  <Card.Footer>
                    <Button type="submit" className="button" block>
                      Login
                    </Button>
                  </Card.Footer>
                </div>
              </Form>
            )}
          </Formik>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
