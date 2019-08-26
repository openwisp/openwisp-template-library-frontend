import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter as Router } from "react-router-dom";
import { mount } from "enzyme";
import ListTemplate from ".";

it("renders ListTemplate without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Router>
      <ListTemplate />
    </Router>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it("test list templates", done => {
  const longDescription = new Array(300).join("somem long text");
  const data = [
    {
      id: 1,
      description: longDescription,
      name: "template1"
    },
    {
      id: 2,
      description: "template 2 description",
      name: "template2"
    },
    {
      id: 3,
      description: null,
      name: "template3"
    }
  ];
  fetch.mockResponseOnce(JSON.stringify(data));
  const component = mount(
    <Router>
      <ListTemplate />
    </Router>
  ).find("ListTemplate");
  expect(fetch.mock.calls.length).toEqual(2);
  process.nextTick(() => {
    expect(component.state()).toEqual({
      data: data
    });
  });
  fetch.resetMocks();
  done();
});

it("test list templates not found", done => {
  const data = [];
  fetch.mockResponseOnce(JSON.stringify(data));
  const component = mount(
    <Router>
      <ListTemplate />
    </Router>
  ).find("ListTemplate");
  expect(fetch.mock.calls.length).toEqual(1);
  process.nextTick(() => {
    expect(component.contains("Not Found")).toBe(true);
  });
  fetch.resetMocks();
  done();
});
