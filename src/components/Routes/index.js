import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import TemplateDetails from "../TemplateDetails";
import Register from "../Register";
import Logout from "../Logout";
import ForgotPassword from "../ForgotPassword";
import ChangePassword from "../ChangePassword";
import UserDetails from "../UserDetails";
import CreateTemplate from "../CreateTemplate";
import ListTemplate from "../ListTemplate";
import NotFound from "../NotFound";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ListTemplate} />
        <Route exact path="/template/:id" component={TemplateDetails} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/user" component={UserDetails} />
        <Route exact path="/forget-password" component={ForgotPassword} />
        <Route exact path="/change-password" component={ChangePassword} />
        <Route exact path="/create-template" component={CreateTemplate} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};
export default Routes;
