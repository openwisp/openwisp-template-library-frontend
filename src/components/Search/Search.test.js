import React from "react";
import ReactDOM from "react-dom";
import { mount } from "enzyme";
import { MemoryRouter as Router } from "react-router-dom";
import Search from ".";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Router>
      <Search />
    </Router>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it("test form handlChange", () => {
  const component = mount(
    <Router>
      <Search />
    </Router>
  ).find("Search");
  component
    .find("Form")
    .find("input")
    .find("[name='name']")
    .simulate("change", {
      persist: () => {},
      target: { name: "name", value: "test-template" }
    });

  expect(component.state()).toEqual({
    name: "test-template",
    des: "",
    org: ""
  });
});

it("test handleSubmit", () => {
  const mockGetURL = jest.fn(() => "?name='test'");
  const component = mount(
    <Router>
      <Search />
    </Router>
  ).find("Search");
  component
    .find("Form")
    .find("input")
    .find("[name='name']")
    .simulate("change", {
      persist: () => {},
      target: { name: "name", value: "test-template" }
    });
  component.instance().getURL = mockGetURL;
  component.find("Form").simulate("submit");
  expect(mockGetURL).toHaveBeenCalled();
});

it("test getURL", () => {
  let url = "";
  const component = mount(
    <Router>
      <Search />
    </Router>
  ).find("Search");
  url = component.instance().getURL();
  expect(url).toEqual("?name=&&org=&&des=");
  component.setState({
    name: "name",
    des: "des",
    org: "org"
  });
  url = component.instance().getURL();
  expect(url).toEqual("?name=name&&org=org&&des=des");
  component
    .find("Form")
    .find("input")
    .find("[name='name']")
    .simulate("change", {
      persist: () => {},
      target: { name: "name", value: "test-template" }
    });
  url = component.instance().getURL();
  expect(url).toEqual("?name=test-template&&org=org&&des=des");
});
