import React, { Component } from "react";
import { BrowserRouter as Router, NavLink, Route } from "react-router-dom";
import AddSection from "./addsection";
import EditSection from "./editsection";
import { Nav } from "react-bootstrap";

class Section extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Router>
        <Nav variant="tabs" >
          <Nav.Item>
            <Nav.Link eventKey="2" as={NavLink} to="/menu/addsection">
              Add Section
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="3" as={NavLink} to="/menu/editsection">
              Edit Section
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Route path="/menu/editsection" exact component={EditSection} />
        <Route path="/menu/addsection" exact component={AddSection} />
      </Router>
    );
  }
}

export default Section;
