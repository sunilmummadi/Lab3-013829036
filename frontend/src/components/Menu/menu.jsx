import React, { Component } from "react";
import { Redirect } from "react-router";
import CustomerMenu from "./CustomerMenu/customermenu";
import RestaurantMenu from "./RestaurantMenu/restaurantmenu";

class Menu extends Component {
  state = {};
  render() {
    let menucomponent = null;
    let redirectVar = null;
    if (localStorage.getItem("token")) {
      if (localStorage.getItem("is_owner") === "1") {
        menucomponent = <RestaurantMenu />;
      } else {
        menucomponent = <CustomerMenu />;
      }
    } else {
      redirectVar = <Redirect to="/login"></Redirect>;
    }
    return (
      <div>
        <div>{redirectVar}</div>

        <div>{menucomponent}</div>
      </div>
    );
  }
}

export default Menu;
