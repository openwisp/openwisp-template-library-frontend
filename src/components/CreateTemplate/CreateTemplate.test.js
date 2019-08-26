import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter as Router } from "react-router-dom";
import { shallow, mount } from "enzyme";
import CreateTemplate from ".";
import CreateTemplateForm from "./CreateTemplateForm";

it("renders CreateTemplate without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Router>
      <CreateTemplate />
    </Router>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it("test create template", done => {
  const values = {
    url: "http://test.com"
  };
  localStorage.setItem("token", "testToken12345");
  fetch.mockResponseOnce(
    JSON.stringify({ template_success: "Template successfully created" })
  );
  const component = mount(
    <Router>
      <CreateTemplate />
    </Router>
  ).find("CreateTemplate");
  component.instance().handleSubmit(values);
  expect(fetch.mock.calls.length).toEqual(1);
  process.nextTick(() => {
    expect(component.state()).toEqual({
      success: "Template successfully created",
      error: []
    });
  });
  fetch.resetMocks();
  localStorage.removeItem("token");
  done();
});

it("test create template error", done => {
  const values = {
    url: "http://test.com"
  };
  localStorage.setItem("token", "testToken12345");
  fetch.mockResponses([
    JSON.stringify({ detail: "server error occurred" }),
    { status: 400 }
  ]);
  const component = mount(
    <Router>
      <CreateTemplate />
    </Router>
  ).find("CreateTemplate");
  component.instance().handleSubmit(values);
  expect(fetch.mock.calls.length).toEqual(1);
  process.nextTick(() => {
    expect(component.state()).toEqual({
      success: null,
      error: { detail: "server error occurred" }
    });
  });
  fetch.resetMocks();
  localStorage.removeItem("token");
  done();
});

it("test create template for logout user", done => {
  const values = {
    url: "http://test.com"
  };
  fetch.mockResponseOnce(
    JSON.stringify({ detail: "template successfully created" })
  );
  const component = mount(
    <Router>
      <CreateTemplate />
    </Router>
  ).find("CreateTemplate");
  component.instance().handleSubmit(values);
  expect(fetch.mock.calls.length).toEqual(0);
  fetch.resetMocks();
  done();
});

it("test form input value", () => {
  const handleSubmit = jest.fn();
  const error = [];
  const success = null;
  const component = mount(
    <CreateTemplateForm
      handleSubmit={handleSubmit}
      error={error}
      success={success}
    />
  );

  component
    .find("Form")
    .find("#url")
    .find("input")
    .simulate("change", {
      persist: () => {},
      target: {
        name: "url",
        value: "http://test.com"
      }
    });
  const newValue = component
    .find("Form")
    .find("#url")
    .find("input")
    .props().value;

  expect(newValue).toEqual("http://test.com");
});

it("test form validation", () => {
  const handleSubmit = jest.fn();
  const component = mount(
    <Router>
      <CreateTemplate />
    </Router>
  ).find("CreateTemplate");
  component.find("Formik").setState({
    values: {
      url: ""
    },
    errors: {
      url: "url is a required field"
    },
    touched: {
      url: true
    }
  });
  component.find("Form").simulate("submit");
  expect(handleSubmit).not.toHaveBeenCalled();
});
