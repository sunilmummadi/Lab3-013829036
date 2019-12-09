import React, { Component } from "react";
import cookie from "react-cookies";
import { Redirect } from "react-router";

import Navbar from "../LandingPage/navbar";
import RestaurantProfileComponent from "./restaurantprofile";
import CustomerProfileComponent from "./customerprofile";

class Profile extends Component {
  state = {};
  render() {
    let profilecomponent = null;
    let redirectVar = null;
    if (localStorage.getItem("token")) {
      if (localStorage.getItem("is_owner") === "1") {
        profilecomponent = <RestaurantProfileComponent />;
      } else {
        profilecomponent = <CustomerProfileComponent />;
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
        <div className="container-fluid">{profilecomponent}</div>
      </div>
    );
  }
}

export default Profile;
