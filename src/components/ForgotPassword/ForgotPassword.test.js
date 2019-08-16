import React from "react";
import ReactDOM from "react-dom";
import { mount } from "enzyme";
import ForgotPassword from ".";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ForgotPassword />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("test reset password success", done => {
  const values = {
    email: "test@email.com"
  };
  fetch.mockResponseOnce(
    JSON.stringify({ detail: "verification email has been sent" })
  );
  const component = mount(<ForgotPassword />);
  component.instance().handleSubmit(values);
  expect(fetch.mock.calls.length).toEqual(1);
  process.nextTick(() => {
    expect(component.state()).toEqual({
      success: "verification email has been sent",
      error: []
    });
  });
  fetch.resetMocks();
  done();
});

it("test reset password failure", done => {
  const values = {
    email: "test@email.com"
  };
  fetch.mockResponses([
    JSON.stringify({ detail: "email error" }),
    { status: 400 }
  ]);
  const component = mount(<ForgotPassword />);
  component.instance().handleSubmit(values);
  expect(fetch.mock.calls.length).toEqual(1);
  process.nextTick(() => {
    expect(component.state()).toEqual({
      success: null,
      error: { detail: "email error" }
    });
  });
  fetch.resetMocks();
  done();
});

it("test form validation", () => {
  const handleSubmit = jest.fn();
  const component = mount(<ForgotPassword />);
  component.find("Formik").setState({
    values: {
      email: "wrong email"
    },
    errors: {
      email: "invalid email"
    },
    touched: {
      email: true
    }
  });
  component.find("Form").simulate("submit");
  expect(handleSubmit).not.toHaveBeenCalled();
});
