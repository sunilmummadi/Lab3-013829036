import React, { Component } from "react";
import { Route } from "react-router-dom";
import jwtDecode from "jwt-decode";

import LoginComponent from "./Login/login";
import CustomerSignUpComponent from "./SignUp/customersignup";
import RestaurantSignUpComponent from "./SignUp/restaurantsignup";
import Home from "./Home/home";
import Profile from "./Profile/profile";
import Navbar from "./LandingPage/navbar";
import Menu from "./Menu/menu";
import CustomerMenu from "./Menu/CustomerMenu/customermenu";
import Cart from "./Cart/cart";
import CustomerOrders from "./Orders/customerorders";

//Create a Main Component
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const user = localStorage.getItem("name");
    this.setState({ user });
  }
  render() {
    return (
      <div>
        <div>
          <Navbar user={this.state.user} />
          {/* <Navbar /> */}
        </div>
        <div></div>
        {/*Render Different Component based on Route*/}
        <Route path="/login" component={LoginComponent} />
        <Route path="/signup/customer" component={CustomerSignUpComponent} />
        <Route
          path="/signup/restaurant"
          component={RestaurantSignUpComponent}
        />
        <Route path="/profile" component={Profile} />
        <Route path="/customermenu" component={CustomerMenu} />
        <Route path="/menu" component={Menu} />
        <Route path="/cart" component={Cart} />
        <Route path="/customerorders" component={CustomerOrders} />
        <Route path="/home" component={Home} />
      </div>
    );
  }
}
//Export The Main Component
export default Main;
