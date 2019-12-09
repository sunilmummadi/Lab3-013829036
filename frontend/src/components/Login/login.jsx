import React, { Component } from "react";
import jwtDecode from "jwt-decode";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

import grubhub from "../../images/grubhub.png";

import { Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "../../App.css";

//Define a Login Component
class LoginComponent extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {};
  }

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  //submit Login handler to send a request to the node backend
  submitLogin = e => {
    //prevent page from refresh
    e.preventDefault();
    const data = {
      email_id: this.state.email_id,
      password: this.state.password
    };
    this.props.loginAction(data);
  };

  render() {
    let alert = null;
    let redirectVar = null;
    let message = null;
    console.log(this.props);
    if (
      this.props.login_message &&
      typeof "this.props.login_message" === "String"
    ) {
      console.log(this.props.login_message);
      message = this.props.login_message;
      alert = <Alert variant="warning">{message}</Alert>;
    } else if (this.props.login_message && this.props.login_message.data) {
      localStorage.setItem("token", this.props.login_message.data);

      const jwt = localStorage.getItem("token");
      console.log(jwt);
      const decoded = jwtDecode(jwt);
      console.log(decoded);
      localStorage.setItem("email_id", decoded.email_id);
      localStorage.setItem("user_id", decoded._id);
      localStorage.setItem("name", decoded.name);
      localStorage.setItem("is_owner", "0");
      if (decoded.is_owner) {
        localStorage.setItem("is_owner", "1");
        localStorage.setItem("restaurant_id", decoded.restaurant._id);
      }
      window.location = "/home";
    }
    if (localStorage.getItem("token")) {
      redirectVar = <Redirect to="/home" />;
    }
    return (
      <div>
        {redirectVar}
        <div class="container-fluid">
          <div class="login-image">
            <img width="110%" height="auto" src={grubhub} alt="login"></img>
          </div>
          <form class="login-form" onSubmit={this.submitLogin}>
            <div class="main-div">
              <div>{alert}</div>

              <div class="panel">
                <h2>Sign in with your Grubhub account</h2>
              </div>

              <div class="form-group">
                <input
                  onChange={this.changeHandler}
                  type="email"
                  class="form-control"
                  name="email_id"
                  id="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div class="form-group">
                <input
                  onChange={this.changeHandler}
                  type="password"
                  class="form-control"
                  name="password"
                  id="password"
                  placeholder="Password"
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary">
                Login
              </button>
              <p>or</p>
              <div>
                <Link to="/signup/customer">
                  <button class="btn btn-primary ">
                    Sign up as a Customer
                  </button>
                </Link>
              </div>
              <div>
                <Link to="/signup/restaurant">
                  <button class="btn btn-primary ">
                    Sign up as a Restaurant
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

// connecting props mapping to action and component
export default graphql(login, { name: "login" })(LoginComponent);
