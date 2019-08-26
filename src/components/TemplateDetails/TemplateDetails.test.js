import React from "react";
import ReactDOM from "react-dom";
import { mount } from "enzyme";
import { MemoryRouter as Router } from "react-router-dom";
import TemplateDetails from ".";

it("renders TemplateDetails without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Router>
      <TemplateDetails />
    </Router>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it("test get details", done => {
  fetch.resetMocks();
  const data = {
    organization: {
      name: "testOrg"
    },
    name: "testTemplate",
    description: "some description",
    url: "http://test.com/api/v1/templates/someKey"
  };
  fetch.mockResponses(
    [JSON.stringify(data)],
    [JSON.stringify({ count: 3 })],
    [JSON.stringify({ count: 1 })]
  );
  const component = mount(
    <Router>
      <TemplateDetails />
    </Router>
  ).find("TemplateDetails");
  expect(fetch.mock.calls.length).toBe(1);
  process.nextTick(() => {
    expect(component.state()).toEqual({
      data: data,
      subscription_count: 3,
      unsubscription_count: 1
    });
    done();
  });
});
