import React, { Component } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

import grubhub from "../../images/grubhub.png";
import { Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "../../App.css";

//Define a OwnerSignUp Component
class RestaurantSignUpComponent extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {};
  }

  //input field change handler to update state variable with the text entered by the user
  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  //submit Login handler to send a request to the node backend
  submitRestaurantSignup = e => {
    //prevent page from refresh
    e.preventDefault();
    const data = {
      name: this.state.name,
      res_name: this.state.res_name,
      res_cuisine: this.state.res_cuisine,
      email_id: this.state.email_id,
      password: this.state.password,
      res_zip_code: this.state.res_zip_code,
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
    if (this.props.signup_message === "Restaurant Already Registered") {
      alert = <Alert variant="warning">User already exists</Alert>;
    }
    return (
      <div>
        {redirectVar}
        <div class="container-fluid">
          <div class="login-image">
            <img width="110%" height="auto" src={grubhub} alt="No"></img>
          </div>

          <div>{alert}</div>
          <form class="login-form" onSubmit={this.submitRestaurantSignup}>
            <div class="main-div">
              <div class="panel">
                <h2>Get more orders</h2>
                <p>
                  Ready to reach new hungry customers? Become a Grubhub partner
                  today!
                </p>
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
              {/* Restaurant Name */}
              <div class="form-group">
                <input
                  onChange={this.changeHandler}
                  type="text"
                  class="form-control"
                  name="res_name"
                  id="restaurantname"
                  placeholder="Restaurant Name"
                  required
                />
              </div>
              {/* Cuisine */}
              <div class="form-group">
                <input
                  onChange={this.changeHandler}
                  type="text"
                  class="form-control"
                  name="res_cuisine"
                  id="cuisine"
                  placeholder="Cuisine"
                  required
                />
              </div>
              {/* Email */}
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

              {/* Zipcode */}
              <div class="form-group">
                <input
                  onChange={this.changeHandler}
                  type="text"
                  class="form-control"
                  name="res_zip_code"
                  id="zipcode"
                  placeholder="Restaurant Zip Code"
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
                  id="phone_number"
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
          </form>
        </div>
      </div>
    );
  }
}

// connecting props mapping to action and component
export default graphql(addRestaurant, { name: "addRestaurant" })(RestaurantSignUpComponent);
