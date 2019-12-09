import React, { Component } from "react";
import { BrowserRouter as Router, NavLink, Route } from "react-router-dom";
import AddItem from "./additem";
import EditItem from "./edititem";
import { Nav } from "react-bootstrap";

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Router>
        <Nav variant="tabs" >
          <Nav.Item>
            <Nav.Link eventKey="2" as={NavLink} to="/menu/item/additem">
              Add Item
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="3" as={NavLink} to="/menu/item/edititem">
              Edit Item
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Route path="/menu/item/edititem" exact component={EditItem} />
        <Route path="/menu/item/additem" exact component={AddItem} />
      </Router>
    );
  }
}

export default Item;
