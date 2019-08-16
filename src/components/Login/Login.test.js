import React from "react";
import { mount, shallow } from "enzyme";
import { MemoryRouter as Router } from "react-router-dom";
import Login from ".";

const script = document.createElement("script");
script.type = "text/javascript";
document.getElementsByTagName("head")[0].appendChild(script);

it("renders Login without crashing", () => {
  shallow(
    <Router>
      <Login />
    </Router>
  );
});

it("test facebook response", done => {
  const data = {
    accessToken: "someTestToken",
    first_name: "testUser"
  };
  fetch.mockResponseOnce(JSON.stringify({ key: "123456789" }));
  const component = mount(
    <Router>
      <Login />
    </Router>
  ).find("Login");
  component.instance().facebookResponse(data);
  expect(fetch.mock.calls.length).toBe(1);
  process.nextTick(() => {
    expect(component.state()).toEqual({
      error: null
    });
    done();
  });
  fetch.resetMocks();
});

it("test facebook login failure", done => {
  const data = {
    accessToken: "someTestToken",
    first_name: "testUser"
  };
  fetch.mockReject(new Error("server error occured"));
  const component = mount(
    <Router>
      <Login />
    </Router>
  ).find("Login");
  component.instance().facebookResponse(data);
  expect(fetch.mock.calls.length).toBe(1);
  process.nextTick(() => {
    expect(component.state()).toEqual({
      error: "could not login you in. please try again"
    });
    done();
  });
  fetch.resetMocks();
});

it("test google response", done => {
  const data = {
    accessToken: "someTestToken",
    profileObj: {
      givenName: "testUser"
    }
  };
  fetch.mockResponseOnce(JSON.stringify({ key: "123456789" }));
  const component = mount(
    <Router>
      <Login />
    </Router>
  ).find("Login");
  component.instance().googleResponse(data);
  expect(fetch.mock.calls.length).toBe(1);
  process.nextTick(() => {
    expect(component.state()).toEqual({
      error: null
    });
    done();
  });
  fetch.resetMocks();
});

it("test google login failure", done => {
  const data = {
    accessToken: "someTestToken",
    profileObj: {
      givenName: "testUser"
    }
  };
  fetch.mockReject(new Error("server error occured"));
  const component = mount(
    <Router>
      <Login />
    </Router>
  ).find("Login");
  component.instance().googleResponse(data);
  expect(fetch.mock.calls.length).toBe(1);
  process.nextTick(() => {
    expect(component.state()).toEqual({
      error: "could not login you in. please try again"
    });
    done();
  });
  fetch.resetMocks();
});

it("test handleSubmit success", done => {
  const data = {
    username: "testUser",
    password: "testPassword12345"
  };
  fetch.mockResponseOnce(JSON.stringify({ key: "123456789" }));
  const component = mount(
    <Router>
      <Login />
    </Router>
  ).find("Login");
  component.instance().handleSubmit(data);
  expect(fetch.mock.calls.length).toBe(1);
  process.nextTick(() => {
    expect(component.state()).toEqual({
      error: null
    });
    done();
  });
  fetch.resetMocks();
});

it("test handleSubmit error", done => {
  const data = {
    username: "testUser",
    password: "testPassword12345"
  };
  fetch.mockResponses([
    JSON.stringify({ error: "server error" }),
    { status: 400 }
  ]);
  const component = mount(
    <Router>
      <Login />
    </Router>
  ).find("Login");
  component.instance().handleSubmit(data);
  expect(fetch.mock.calls.length).toBe(1);
  process.nextTick(() => {
    expect(component.state()).toEqual({
      error: { error: "server error" }
    });
    done();
  });
  fetch.resetMocks();
});

it("test social login failure", done => {
  const error = {
    non_field_errors: "we couldn't login you at the moment"
  };
  const component = mount(
    <Router>
      <Login />
    </Router>
  ).find("Login");
  component.instance().onFailure(error);
  process.nextTick(() => {
    expect(component.state()).toEqual({
      error: { non_field_errors: "we couldn't login you at the moment" }
    });
    done();
  });
});

it("test form validation", () => {
  const handleSubmit = jest.fn();
  const component = mount(
    <Router>
      <Login />
    </Router>
  ).find("Login");
  component.find("Formik").setState({
    values: {
      username: "",
      password: ""
    },
    errors: {
      username: "username is required",
      password: "password is required"
    },
    touched: {
      username: true,
      password: true
    }
  });
  component.find("Form").simulate("submit");
  expect(handleSubmit).not.toHaveBeenCalled();
});
