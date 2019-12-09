import React, { Component } from "react";
import { Redirect } from "react-router";
import CustomerHome from "./customerhome";
import RestaurantHome from "./restauranthome/restauranthome";
import cookie from "react-cookies";
import Navbar from "../LandingPage/navbar";

class Home extends Component {
  state = {};
  render() {
    let homecomponent = null;
    let redirectVar = null;
    if (localStorage.getItem("token")) {
      if (localStorage.getItem("is_owner") === "1") {
        homecomponent = <RestaurantHome />;
      } else {
        homecomponent = <CustomerHome />;
      }
    } else {
      redirectVar = <Redirect to="/login"></Redirect>;
    }
    return (
      <div>
        <div>{redirectVar}</div>
        {/* <div>
          <Navbar />
        </div> */}
        <div>{homecomponent}</div>
      </div>
    );
  }
}

export default Home;
