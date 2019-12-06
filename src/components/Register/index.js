import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import RegisterForm from "./RegisterForm"

class Register extends Component {
  render() {
    return (
      <main>
        <Header />
        <RegisterForm />
        <Footer />
      </main>
    );
  }
}

Register = withRouter(Register); 
export default Register;