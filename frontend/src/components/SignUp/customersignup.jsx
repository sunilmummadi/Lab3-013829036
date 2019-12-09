import React, { Component } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

import grubhub from "../../images/grubhub.png";
import { Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "../../App.css";

//Define a CustomerSignUp Component
class CustomerSignUpComponent extends Component {
  //Call the Will Mount to set the auth Flag to false
  constructor(props) {
    super(props);
    this.state = {};
  }

  //input field change handler to update state variable with the text entered by the user
  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  //submit Login handler to send a request to the node backend
  submitCustomerSignup = e => {
    //prevent page from refresh
    e.preventDefault();

    let data = {
      name: this.state.name,
      email_id: this.state.email_id,
      password: this.state.password,
      address: this.state.address,
      phone_number: this.state.phone_number
    };

    
  };

  render() {
    //redirect based on successful login
    let redirectVar = null;
    if (this.props.signup_message.status === 200) {
      window.location = "/login";
    }
    let alert = null;
    if (this.props.signup_message === "User Already Registered") {
      console.log(this.props.signup_message.data);
      alert = <Alert variant="warning">User already exists</Alert>;
    }
    console.log(alert);

    return (
      <div>
        {redirectVar}
        <div class="container-fluid">
          <div class="login-image">
            <img width="110%" height="auto" src={grubhub} alt="signup"></img>
          </div>

          <form class="login-form" onSubmit={this.submitCustomerSignup}>
            <div class="main-div">
              <div class="panel">
                <h2>Create your account</h2>
              </div>
              {/* Name field */}
              <div class="form-group">
                <input
                  onChange={this.changeHandler}
                  type="text"
                  class="form-control"
                  name="name"
                  id="name"
                  placeholder="Name"
                  required
                />
              </div>
              {/* Email field */}
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
              {/* Password */}
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
              {/* Address */}
              <div class="form-group">
                <input
                  onChange={this.changeHandler}
                  type="text"
                  class="form-control"
                  name="address"
                  id="address"
                  placeholder="Address"
                  required
                />
              </div>
              {/* Phone Number field */}
              <div class="form-group">
                <input
                  onChange={this.changeHandler}
                  type="number"
                  class="form-control"
                  name="phone_number"
                  id="number"
                  placeholder="Phone Number"
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary">
                Create your account
              </button>
              <p>or</p>
              <div>
                Have an account?
                <Link to="/login">Sign in</Link>
              </div>
            </div>
            <div>{alert}</div>
          </form>
        </div>
      </div>
    );
  }
}

// connecting props mapping to action and component

export default graphql(addCustomer, { name: "addCustomer" })(CustomerSignUpComponent);
