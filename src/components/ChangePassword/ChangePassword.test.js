import React, { Component } from "react";
import ReactDOM from "react-dom";
import { MemoryRouter as Router } from "react-router-dom";
import { shallow, mount } from "enzyme";
import ChangePassword from ".";
import ChangePasswordForm from "./ChangePasswordForm";

it("renders ChangePassword without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Router>
      <ChangePassword />
    </Router>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it("test handleSubmit success function", done => {
  const values = {
    new_password1: "password12345",
    new_password2: "password12345"
  };
  localStorage.setItem("token", "testToken12345");
  fetch.mockResponseOnce(
    JSON.stringify({ detail: "password successfully changed" })
  );
  const component = mount(
    <Router>
      <ChangePassword />
    </Router>
  ).find("ChangePassword");
  component.instance().handleSubmit(values);
  expect(fetch.mock.calls.length).toEqual(1);
  process.nextTick(() => {
    expect(component.state()).toEqual({
      success: "password successfully changed",
      error: []
    });
  });
  fetch.resetMocks();
  localStorage.removeItem("token");
  done();
});

it("test handleSubmit failure", done => {
  const values = {
    new_password1: "password12345",
    new_password2: "password12345"
  };
  localStorage.setItem("token", "testToken12345");
  fetch.mockResponses([
    JSON.stringify({ detail: "server error occurred" }),
    { status: 400 }
  ]);
  const component = mount(
    <Router>
      <ChangePassword />
    </Router>
  ).find("ChangePassword");
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

it("test handleSubmit for logout user", done => {
  const values = {
    new_password1: "password12345",
    new_password2: "password12345"
  };
  fetch.mockResponseOnce(
    JSON.stringify({ detail: "password successfully changed" })
  );
  const component = mount(
    <Router>
      <ChangePassword />
    </Router>
  ).find("ChangePassword");
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
    <ChangePasswordForm
      handleSubmit={handleSubmit}
      error={error}
      success={success}
    />
  );

  component
    .find("Form")
    .find("#new_password1")
    .find("input")
    .simulate("change", {
      persist: () => {},
      target: {
        name: "new_password1",
        value: "value1234567"
      }
    });
  const newValue = component
    .find("Form")
    .find("#new_password1")
    .find("input")
    .props().value;

  expect(newValue).toEqual("value1234567");
});

it("test form validation", () => {
  const handleSubmit = jest.fn();
  const component = mount(
    <Router>
      <ChangePassword />
    </Router>
  ).find("ChangePassword");
  component.find("Formik").setState({
    values: {
      new_password1: "",
      new_password2: "wrong"
    },
    errors: {
      new_password1: "password is a required field",
      new_password2: "must match"
    },
    touched: {
      new_password1: true,
      new_password2: true
    }
  });
  component.find("Form").simulate("submit");
  expect(handleSubmit).not.toHaveBeenCalled();
});
