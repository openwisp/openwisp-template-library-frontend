import React from "react";
import ReactDOM from "react-dom";
import { mount } from "enzyme";
import { MemoryRouter as Router } from "react-router-dom";
import UserDetails from ".";
import UserDetailsForm from "./UserDetailsForm";

it("renders UserDetails without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Router>
      <UserDetails />
    </Router>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it("test get user UserDetails", done => {
  localStorage.setItem("token", "token1234567");
  const data = {
    username: "test",
    first_name: "test",
    last_name: "user",
    email: "test@email.com"
  };
  fetch.mockResponseOnce(JSON.stringify(data));
  const component = mount(
    <Router>
      <UserDetails />
    </Router>
  ).find("UserDetails");
  expect(fetch.mock.calls.length).toBe(1);
  process.nextTick(() => {
    expect(component.state()).toEqual({
      username: "test",
      first_name: "test",
      last_name: "user",
      email: "test@email.com",
      error: [],
      success: null
    });
    done();
  });

  fetch.resetMocks();
  localStorage.removeItem("token");
});

it("test get UserDetails for logout users", done => {
  const data = {
    username: "test",
    first_name: "test",
    last_name: "user",
    email: "test@email.com"
  };
  fetch.mockResponseOnce(JSON.stringify(data));
  const component = mount(
    <Router>
      <UserDetails />
    </Router>
  ).find("UserDetails");
  expect(fetch.mock.calls.length).toBe(0);
  process.nextTick(() => {
    expect(component.state()).toEqual({
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      error: [],
      success: null
    });
    done();
  });
  fetch.resetMocks();
});

it("test handleUpdate success", done => {
  const data = {
    username: "newName",
    first_name: "test",
    last_name: "user",
    email: "test@email.com"
  };
  localStorage.setItem("user", "testUser");
  localStorage.setItem("token", "token1234567");
  fetch.mockResponses([JSON.stringify(data)], [JSON.stringify(data)]);
  const component = mount(
    <Router>
      <UserDetails />
    </Router>
  ).find("UserDetails");
  component.instance().handleUpdate(data);
  expect(fetch.mock.calls.length).toBe(2);
  process.nextTick(() => {
    expect(component.state()).toEqual({
      username: "newName",
      first_name: "test",
      last_name: "user",
      email: "test@email.com",
      success: "User details successfully updated",
      error: []
    });
    done();
  });

  fetch.resetMocks();
  localStorage.removeItem("token");
  localStorage.removeItem("user");
});

it("test handleUpdate failure", done => {
  const data = {
    username: "alreadyExist",
    first_name: "test",
    last_name: "user",
    email: "test@email.com"
  };
  localStorage.setItem("user", "testUser");
  localStorage.setItem("token", "token1234567");
  fetch.mockResponses(
    [JSON.stringify(data)],
    [JSON.stringify({ error: "username already exist" }), { status: 400 }]
  );
  const component = mount(
    <Router>
      <UserDetails />
    </Router>
  ).find("UserDetails");
  component.instance().handleUpdate(data);
  expect(fetch.mock.calls.length).toBe(2);
  process.nextTick(() => {
    expect(component.state()).toEqual({
      username: "alreadyExist",
      first_name: "test",
      last_name: "user",
      email: "test@email.com",
      success: null,
      error: { error: "username already exist" }
    });
    done();
  });
  fetch.resetMocks();
  localStorage.removeItem("token");
  localStorage.removeItem("user");
});

it("test form validation", () => {
  const handleUpdate = jest.fn();
  localStorage.setItem("token", "token1234567");
  const data = {
    username: "test",
    first_name: "test",
    last_name: "user",
    email: "test@email.com",
    success: null,
    error: []
  };
  const component = mount(
    <Router>
      <UserDetailsForm
        username={data.username}
        first_name={data.first_name}
        last_name={data.last_name}
        email={data.email}
        handleUpdate={handleUpdate}
        success={data.success}
        error={data.error}
      />
    </Router>
  );
  component.find("Formik").setState({
    values: {
      username: "",
      first_name: 123456,
      last_name: 12098
    },
    errors: {
      username: "username is required",
      first_name: "first name must be as string",
      last_name: "last name must be a string"
    },
    touched: {
      username: true,
      last_name: true,
      first_name: true
    }
  });
  component.find("Form").simulate("submit");
  expect(handleUpdate).not.toHaveBeenCalled();
  fetch.resetMocks();
});
