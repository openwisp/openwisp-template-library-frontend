import React from "react";
import { Route } from "react-router-dom";
import { mount, shallow } from "enzyme";
import TemplateDetails from "../TemplateDetails";
import Login from "../Login";
import Logout from "../Logout";
import SignUp from "../SignUp";
import ForgotPassword from "../ForgotPassword";
import ChangePassword from "../ChangePassword";
import UserDetails from "../UserDetails";
import CreateTemplate from "../CreateTemplate";
import ListTemplate from "../ListTemplate";
import NotFound from "../NotFound";
import Routes from ".";

it("renders Routes without crashing", () => {
  mount(<Routes />);
});

let pathMap = {};
describe("routes using memory router", () => {
  beforeAll(() => {
    const component = shallow(<Routes />);
    pathMap = component.find(Route).reduce((pathMap, route) => {
      const routeProps = route.props();
      pathMap[routeProps.path] = routeProps.component;
      return pathMap;
    }, {});
  });

  it("/ should route to ListTemplate", () => {
    expect(pathMap["/"]).toBe(ListTemplate);
  });

  it("/template/:id should route to TemplateDetails", () => {
    expect(pathMap["/template/:id"]).toBe(TemplateDetails);
  });

  it("/login should route to Login", () => {
    expect(pathMap["/login"]).toBe(Login);
  });

  it("/logout should route to Logout", () => {
    expect(pathMap["/logout"]).toBe(Logout);
  });

  it("/signup should route to SignUp", () => {
    expect(pathMap["/signup"]).toBe(SignUp);
  });

  it("/forget-password should route to ForgotPassword", () => {
    expect(pathMap["/forget-password"]).toBe(ForgotPassword);
  });

  it("/change-password should route to ChangePassword", () => {
    expect(pathMap["/change-password"]).toBe(ChangePassword);
  });

  it("/user should route to UserDetails", () => {
    expect(pathMap["/user"]).toBe(UserDetails);
  });

  it("/create-template should route to CreateTemplate", () => {
    expect(pathMap["/create-template"]).toBe(CreateTemplate);
  });

  it("/unknown should route to NotFound", () => {
    expect(pathMap["undefined"]).toBe(NotFound);
  });
});
