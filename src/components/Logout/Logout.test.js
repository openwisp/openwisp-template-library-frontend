import React from "react";
import ReactDOM from "react-dom";
import { mount } from "enzyme";
import { MemoryRouter as Router } from "react-router-dom";
import Logout from ".";

it("renders Logout without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Router>
      <Logout />
    </Router>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it("test logout success", done => {
  localStorage.setItem("user", "testUser");
  fetch.mockResponseOnce(JSON.stringify({ success: "You have been logout" }));
  const component = mount(
    <Router>
      <Logout />
    </Router>
  ).find("Logout");
  component.instance().handleLogout();
  expect(fetch.mock.calls.length).toBe(2);
  process.nextTick(() => {
    expect(component.state()).toEqual({
      user: null
    });
    done();
  });
  fetch.resetMocks();
});
