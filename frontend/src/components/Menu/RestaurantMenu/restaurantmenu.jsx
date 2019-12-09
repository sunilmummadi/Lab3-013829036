import React, { Component } from "react";
import { BrowserRouter as Router, NavLink, Route } from "react-router-dom";
import { Nav, Container, Row, Col } from "react-bootstrap";
import CompleteMenu from "./completemenu";
import Section from "./section";
import Item from "./item";


class RestaurantMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: ""
    };
  }
  handleClick = e => {
    e.preventDefault();
    this.setState({
      activeKey: e.target.eventKey
    });
  };

  render() {
    return (
      <Container fluid={true}>
        <br />
        <Row>
          <Router>
            <Col sm="2">
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link
                    eventKey="1"
                    as={NavLink}
                    to="/menu/complete"
                    exact
                  >
                    Complete Menu
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="2"
                    as={NavLink}
                    to="/menu/section"
                  >
                    Menu Section
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="3"
                    as={NavLink}
                    to="/menu/item"
                  >
                    Menu Items
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm="10">
              <Route
                path="/menu/complete"
                exact
                component={CompleteMenu}
              />
              <Route
                path="/menu/section"
                exact
                component={Section}
              />
              <Route path="/menu/item" exact component={Item} />
            </Col>
          </Router>
        </Row>
      </Container>
    );
  }
}

export default RestaurantMenu;
