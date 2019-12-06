import React from "react";
import { MemoryRouter as Router } from "react-router-dom";
import { shallow } from "enzyme";
import Register from ".";

it("renders Register without crashing", () => {
  shallow(
    <Router>
      <Register />
    </Router>
  );
});