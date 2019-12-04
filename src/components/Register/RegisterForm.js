import React from "react";
import {Card, Tabs, Tab } from "react-bootstrap";
import Login from "../Login";
import SignUp from "../SignUp";

const RegisterForm = props => {
  return (
    <div>
      <div className="container">
        <h1>Register</h1>
        <hr/>
        <Card style={{padding:'10px 20px', width: '35rem'}} className="mx-auto">
          <Tabs style={{padding:'0 10px'}} className="mx-auto" defaulActiveKey="login">
            <Tab eventKey="login" title="Login">
              <hr/>
              <Login/>
            </Tab>
            <Tab eventKey="signup" title="Sign Up">
              <hr/>
              <SignUp/>
            </Tab>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default RegisterForm;
