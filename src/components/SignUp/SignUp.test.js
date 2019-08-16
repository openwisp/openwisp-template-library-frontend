import React from "react";
import ReactDOM from "react-dom";
import { mount } from "enzyme";
import { MemoryRouter as Router } from "react-router-dom";
import SignUp from ".";

it("renders SignUp without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Router>
      <SignUp />
    </Router>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it("test signup handleSubmit", done => {
  const data = {
    username: "testUser",
    email: "test@email.com",
    password: "test1234567",
    passwordConfirmation: "test1234567"
  };
  fetch.mockResponseOnce(
    JSON.stringify({ detail: "account successfully created" })
  );
  const component = mount(
    <Router>
      <SignUp />
    </Router>
  ).find("SignUp");
  component.instance().handleSubmit(data);
  expect(fetch.mock.calls.length).toBe(1);
  process.nextTick(() => {
    expect(component.state()).toEqual({
      success: "account successfully created",
      error: []
    });
    done();
  });
  fetch.resetMocks();
});

it("test signup user already exist", done => {
  const data = {
    username: "testUser",
    email: "test@email.com",
    password: "test1234567",
    passwordConfirmation: "test1234567"
  };
  fetch.mockResponses([
    JSON.stringify({
      username: "a user with this name already exist",
      email: "a user with this email already exist"
    }),
    { status: 400 }
  ]);
  const component = mount(
    <Router>
      <SignUp />
    </Router>
  ).find("SignUp");
  component.instance().handleSubmit(data);
  expect(fetch.mock.calls.length).toBe(1);
  process.nextTick(() => {
    expect(component.state()).toEqual({
      success: null,
      error: {
        username: "a user with this name already exist",
        email: "a user with this email already exist"
      }
    });
    done();
  });
  fetch.resetMocks();
});

it("test form validation", () => {
  const handleSubmit = jest.fn();
  const component = mount(
    <Router>
      <SignUp />
    </Router>
  ).find("SignUp");
  component.find("Formik").setState({
    values: {
      username: "",
      email: "wrong email",
      password: "invalid",
      passwordConfirmation: "wrong"
    },
    errors: {
      username: "username is a required field",
      email: "invalid email",
      password: "password is invalid",
      passwordConfirmation: "must match"
    },
    touched: {
      email: true,
      username: true,
      password: true,
      passwordConfirmation: true
    }
  });
  component.find("Form").simulate("submit");
  expect(handleSubmit).not.toHaveBeenCalled();
});
