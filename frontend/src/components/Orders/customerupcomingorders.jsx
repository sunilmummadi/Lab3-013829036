import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import { Col, Row, Card, Container, Button, Alert } from "react-bootstrap";
import serverURL from "../../config";
import OrderDetails from "./orderdetails";
import Chat from "../chat";

class CustomerUpcomingOrders extends Component {
  constructor(props) {
    super(props);
    this.setState({
      message: "",
      upcoming_orders: []
    });

    this.fetchUpcomingOrders();
  }

  componentWillMount() {
    document.title = "Your Orders";
  }

  cancelOrder = e => {
    let upcoming_orders = this.state.upcoming_orders;
    let data = {
      order_id: e.target.name
    };

    axios
      .post(`${serverURL}/api/orders/cancelorder`, data)
      .then(response => {
        if (response.data === "Canceled") {
          let index = upcoming_orders.findIndex(
            order => order._id === data.order_id
          );
          upcoming_orders.splice(index, 1);
          this.setState({
            upcoming_orders: upcoming_orders,
            message: response.data
          });
        }
      })
      .catch(error => {
        this.setState({
          message: "Order Error"
        });
      });
  };

  fetchUpcomingOrders = () => {
    axios
      .get(
        `${serverURL}/api/orders/customer/upcomingorders/${localStorage.getItem(
          "user_id"
        )}`
      )
      .then(response => {
        if ((response.status = 200)) {
          this.setState({
            upcoming_orders: response.data
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
    let redirectVar = null;
    let orders = [];
    let orderCards = null;
    let message = null;
    if (
      !localStorage.getItem("user_id") ||
      localStorage.getItem("is_owner") === "1"
    ) {
      redirectVar = <Redirect to="/home" />;
    }
    if (this.state && this.state.message === "Canceled") {
      message = <Alert variant="success">Your order is cancelled.</Alert>;
    } else if (this.state && this.state.message === "Order Error") {
      message = (
        <Alert variant="warning">Your order could not be cancelled.</Alert>
      );
    } else if (this.state && this.state.message === "No Upcoming Orders") {
      message = (
        <Link to="/customer/pastorders">
          <Alert variant="warning">
            You do not have any upcoming orders. Click here to view your past
            orders.
          </Alert>
        </Link>
      );
    }
    if (this.state && this.state.upcoming_orders) {
      orders = this.state.upcoming_orders;
      if (orders.length > 0) {
        orderCards = orders.map(order => {
          return (
            <Card style={{ width: "100%", margin: "2%" }}>
              <Card.Body>
                <Row>
                  <Col>
                    <Card.Title>{order.restaurant.res_name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {order.restaurant.address} |{" "}
                      {order.restaurant.res_zip_code}
                    </Card.Subtitle>
                  </Col>
                  <Col align="center">
                    <Card.Text>{order.status}</Card.Text>
                    <Card.Text>{order.order_date}</Card.Text>
                  </Col>
                  <Col align="right">
                    <Button
                      variant="secondary"
                      name={order._id}
                      onClick={this.cancelOrder}
                    >
                      Cancel Order
                    </Button>
                    &nbsp;
                  </Col>
                  <Col>
                    <Chat order={order} />
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
    }
    return (
      <div>
        {redirectVar}
        <br />
        <Container className="justify-content">
          <h3>Your Upcoming Orders</h3>
          <br />
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

export default CustomerUpcomingOrders;
