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
    lusername: Yup.string().required(),
    lpassword: Yup.string().required()
  });
  return (
    <div>
      <div className="container">
        <br />
        <hr />
        <Card style={{ width: "30rem" }} className="mx-auto">
          <br />
          <div className="social">
            <FacebookLogin
              appId={config.FACEBOOK_APP_ID}
              autoLoad={false}
              fields="email, name, first_name, last_name"
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
              lusername: "",
              lpassword: ""
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
                  <Form.Group controlId="lusername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      value={values.lusername}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter username"
                      isInvalid={!!errors.lusername && touched.lusername}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.lusername}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="lpassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      name="lpassword"
                      value={values.lpassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter password"
                      isInvalid={!!errors.lpassword && touched.lpassword}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.lpassword}
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
