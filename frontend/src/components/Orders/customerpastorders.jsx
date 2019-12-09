import React, { Component } from "react";
import OrderDetails from "./orderdetails";
import serverURL from "../../config";
import axios from "axios";
import { Row, Col, Button, Card, Alert, Container } from "react-bootstrap";

class CustomerPastOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.fetchPastOrders();
  }

  fetchPastOrders = () => {
    axios
      .get(
        `${serverURL}/api/orders/customer/pastorders/${localStorage.getItem(
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
                    <Card.Title>{order.restaurant.res_name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {order.restaurant.address} | {order.restaurant.res_zip_code}
                    </Card.Subtitle>
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
        <Alert variant="warning">
          You do not have any orders made in the past.
        </Alert>
      );
    }
    return (
      <div>
        <Container className="justify-content">
          <h3>Your past orders</h3>
          {message}
          {orderCards}
          <center>
            <Button href="/home">Home</Button>
          </center>
        </Container>
      </div>
    );
  }
}

export default CustomerPastOrders;
