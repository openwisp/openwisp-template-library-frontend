import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import Header from ".";

it("renders Header without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Header />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("test header for login user", () => {
  localStorage.setItem("user", "test");
  const component = shallow(<Header />);
  expect(component.contains("Logout")).toBe(true);
  localStorage.removeItem("user");
});

it("test header for logout user", () => {
  const component = shallow(<Header />);
  expect(component.contains("Logout")).toBe(false);
});
