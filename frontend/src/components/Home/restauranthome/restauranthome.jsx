import React, { Component } from "react";
import { BrowserRouter as Router, NavLink, Route } from "react-router-dom";
import RestaurantPastOrders from "./restaurantpastorders";
import RestaurantUpcomingOrders from "./restaurantupcomingorders";
import { Nav, Row, Col, Container } from "react-bootstrap";

class RestaurantHome extends Component {
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
                    to="/restaurantorders/pastorders"
                  >
                    Past Orders
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="3"
                    as={NavLink}
                    to="/restaurantorders/upcomingorders"
                  >
                    Upcoming Orders
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm="10">
              <h2>Restaurant Orders</h2>
              <Route
                path="/restaurantorders/pastorders"
                exact
                component={RestaurantPastOrders}
              />
              <Route
                path="/restaurantorders/upcomingorders"
                exact
                component={RestaurantUpcomingOrders}
              />
            </Col>
          </Router>
        </Row>
      </Container>
    );
  }
}
export default RestaurantHome;
