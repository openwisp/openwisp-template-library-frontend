import React from "react";
import { Formik } from "formik";
import { Form, Button } from "react-bootstrap";
import * as Yup from "yup";
import "../../index.css";

const CreateTemplateForm = props => {
  const schema = Yup.object({
    url: Yup.string().required()
  });
  return (
    <div>
      <div className="container">
        <h1>Create Template</h1>
        <hr />
        <Formik
          validationSchema={schema}
          onSubmit={props.handleSubmit}
          initialValues={{
            url: ""
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
                {props.error.template_errors || null}
              </p>
              <p className="text-success">
                {props.success || null}
              </p>
              <Form.Group controlId="url">
                <Form.Label>Public URL:</Form.Label>
                <Form.Control
                  type="url"
                  name="url"
                  value={values.url}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter the url of the public template"
                  isInvalid={errors.url && touched.url}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.url}
                </Form.Control.Feedback>
              </Form.Group>
              <br />
              <Button type="submit" className="text-right button">
                Create
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateTemplateForm;
