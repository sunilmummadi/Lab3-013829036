import React, { Component } from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import { connect } from "react-redux";
import grubhublogo from "../../images/grubhublogo.png";
import { logoutAction } from "../../actions/loginActions";
import { Navbar, Nav, Dropdown } from "react-bootstrap";

//create the Navbar Component
class Navigationbar extends Component {
  constructor() {
    super();
    this.state = {
      name: localStorage.getItem("name")
    };
  }

  //handle logout style={{ color: '#FFF' }} to destroy the cookie
  handleLogout = () => {
    window.localStorage.clear();
    this.props.logoutAction();
    window.location = "/login";
  };

  render() {
    let navUser = null;
    let orders = null;
    let nameMsg = null;

    if (localStorage.getItem("is_owner") === "0") {
      orders = (
        <Dropdown.Item>
          <Link
            style={{ color: "#000" }}
            to="/customerorders"
            className="nav-link"
          >
            &nbsp;&nbsp;Orders
          </Link>
        </Dropdown.Item>
      );
    }

    nameMsg = (
      <Dropdown>
        <Dropdown.Toggle
          variant="link"
          style={{ color: "#FFF" }}
          id="dropdown-basic"
        >
          {this.props.user}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item style={{ color: "#000" }}>
            <Link style={{ color: "#000" }} to="/profile" className="nav-link">
              &nbsp;&nbsp;Profile
            </Link>
          </Dropdown.Item>
          {orders}
          <Dropdown.Item>
            <Link
              style={{ color: "#000" }}
              to="/"
              className="nav-link"
              onClick={this.handleLogout}
            >
              &nbsp;&nbsp;Logout
            </Link>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );

    if (localStorage.getItem("user_id")) {
      if (localStorage.getItem("is_owner") === "1") {
        navUser = (
          <div className="collapse navbar-collapse navbar-right" id="navbarNav">
            <Nav className="mr-auto"></Nav>
            <Nav.Link>{nameMsg}</Nav.Link>
            <Nav.Link>
              <Link
                style={{ color: "#FFF" }}
                to="/menu/complete"
                className="nav-link"
                href="#"
              >
                &nbsp;&nbsp;Menu
              </Link>
            </Nav.Link>
          </div>
        );
      } else {
        navUser = (
          <div className="collapse navbar-collapse navbar-right" id="navbarNav">
            <Nav className="mr-auto"></Nav>
            <Nav.Link>{nameMsg}</Nav.Link>
            <Nav.Link>
              <Link
                style={{ color: "#FFF" }}
                to="/cart"
                className="nav-link"
                href="#"
              >
                &nbsp;&nbsp;Cart
              </Link>
            </Nav.Link>
          </div>
        );
      }
    } else {
      navUser = (
        <div className="collapse navbar-collapse navbar-right" id="navbarNav">
          <Nav className="mr-auto"></Nav>
          <Nav.Link>
            <Link style={{ color: "#FFF" }} to="/login" className="nav-link">
              &nbsp;Login
            </Link>
          </Nav.Link>
        </div>
      );
    }

    return (
      <div>
        <Navbar bg="dark" variant="light">
          <Navbar.Brand>
            <Link
              style={{ color: "#FFF" }}
              to="/home"
              className="nav-link"
              href="#"
            >
              <img
                src={grubhublogo}
                width="auto"
                height="35"
                className="d-inline-block align-top"
                alt="Grubhub"
              />
            </Link>
          </Navbar.Brand>
          {navUser}
        </Navbar>
      </div>
    );
  }
}

export default connect(
  null,
  { logoutAction }
)(Navigationbar);
