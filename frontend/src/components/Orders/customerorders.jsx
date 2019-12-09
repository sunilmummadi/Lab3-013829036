import React, { Component } from "react";
import { BrowserRouter as Router, NavLink, Route } from "react-router-dom";
import CustomerPastOrders from "./customerpastorders";
import CustomerUpcomingOrders from "./customerupcomingorders";
import { Nav, Container, Col, Row } from "react-bootstrap";

class CustomerOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
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
                    eventKey="2"
                    as={NavLink}
                    to="/customerorders/pastorders"
                  >
                    Past Orders
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="3"
                    as={NavLink}
                    to="/customerorders/upcomingorders"
                  >
                    Upcoming Orders
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm="10">
              <Route
                path="/customerorders/pastorders"
                exact
                component={CustomerPastOrders}
              />
              <Route
                path="/customerorders/upcomingorders"
                exact
                component={CustomerUpcomingOrders}
              />
            </Col>
          </Router>
        </Row>
      </Container>
    );
  }
}

export default CustomerOrders;
