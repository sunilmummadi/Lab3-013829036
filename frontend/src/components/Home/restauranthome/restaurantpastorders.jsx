import React, { Component } from "react";
import OrderDetails from "./restaurantorderdetails";
import serverURL from "../../../config";
import axios from "axios";
import {
  Row,
  Col,
  Button,
  Card,
  Alert,
  Container,
  Modal
} from "react-bootstrap";

class RestaurantPastOrders extends Component {
  constructor(props) {
    super(props);
    this.getPastOrders();
  }

  getPastOrders = () => {
    axios
      .get(
        `${serverURL}/api/orders/restaurant/pastorders/${localStorage.getItem(
          "user_id"
        )}`
      )
      .then(response => {
        if (response.data[0]) {
          this.setState({
            past_orders: response.data
          });
        }
      })
      .catch(err => {
        if (err.response && err.response.data) {
          this.setState({
            message: err.response.data
          });
        }
      });
  };

  render() {
    let message = null;
    let orders = [];
    let orderCards = null;

    if (this.state && this.state.past_orders) {
      orders = this.state.past_orders;
      if (orders.length > 0) {
        orderCards = orders.map(order => {
          return (
            <Card style={{ width: "100%", margin: "2%" }}>
              <Card.Body>
                <Row>
                  <Col>
                    <Card.Title>{order.customer.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {order.customer.address}
                    </Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">
                      {order.customer.phone_number}
                    </Card.Subtitle>
                    <br />
                    <Card.Text>{order.order_date}</Card.Text>
                  </Col>
                  <Col align="center">
                    <br />
                    <b>Order Status</b>
                    <br />
                    {order.status}
                    <br />
                  </Col>
                </Row>
                <br />
                <br />
                <OrderDetails order_details={order} />
              </Card.Body>
            </Card>
          );
        });
      }
    } else {
      message = (
        <Alert variant="warning">You did not complete any orders yet.</Alert>
      );
    }
    return (
      <div>
        <Container className="justify-content">
          <br />
          <h4>Your past orders</h4>
          {message}
          {orderCards}
          <center>
            <Button varaint="danger" href="/home">
              Home
            </Button>
          </center>
        </Container>
      </div>
    );
  }
}

export default RestaurantPastOrders;
