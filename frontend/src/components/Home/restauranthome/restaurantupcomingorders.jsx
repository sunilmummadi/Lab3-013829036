import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OrderDetails from "./restaurantorderdetails";
import Chat from "../../chat";
import {
  Col,
  Row,
  Card,
  Container,
  Button,
  Alert,
  Form,
  Modal
} from "react-bootstrap";
import serverURL from "../../../config";

class UpcomingOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getUpcomingOrders();
  }

  getUpcomingOrders = () => {
    axios
      .get(
        `${serverURL}/api/orders/restaurant/upcomingorders/${localStorage.getItem(
          "user_id"
        )}`
      )
      .then(response => {
        if (response.status === 200) {
          console.log(response.data);
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

  onStatusChange = e => {
    e.preventDefault();
    let order_id = e.target.name;
    let newStatus = e.target.value;
    let orders = this.state.upcoming_orders;
    let index = orders.findIndex(order => order._id === order_id);
    console.log(index);
    orders[index].status = newStatus;

    let data = {
      order_id: order_id,
      status: newStatus
    };

    axios
      .post(`${serverURL}/api/orders/orderstatus`, data)
      .then(response => {
        if (response.data === "Status Updated") {
          this.setState({
            upcoming_orders: orders,
            message: response.data
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    let redirectVar = null;
    let orders = [];
    let orderCards = null;
    let message = null;
    let statusDropdown;
    let statusOptions;
    let statuses = ["Placed", "Delivered", "Declined"];

    if (this.state && this.state.message === "No Upcoming Orders") {
      message = (
        <Alert variant="warning">You do not have any pending orders.</Alert>
      );
    } else if (this.state && this.state.message === "Status Updated") {
      message = <Alert variant="success">Order Status Updated</Alert>;
    }

    if (this.state && this.state.upcoming_orders) {
      orders = this.state.upcoming_orders;
      if (orders.length > 0) {
        orderCards = orders.map(order => {
          statusOptions = statuses.map(status => {
            if (status === order.status) {
              return <option selected>{status}</option>;
            }
            return <option>{status}</option>;
          });
          statusDropdown = (
            <Form.Control
              as="select"
              style={{ width: "80%" }}
              name={order._id}
              onChange={this.onStatusChange}
            >
              {statusOptions}
            </Form.Control>
          );

          return (
            <Card style={{ width: "50rem", margin: "2%" }}>
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
                  <Col>
                    <Row>
                      <Col align="center">
                        <b>Order Status</b>
                        <br />
                        {statusDropdown}
                        <br />
                      </Col>
                      <Col>
                        <br />
                        <Chat order={order} />
                      </Col>
                    </Row>
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
        <Container className="justify-content">
          <br />
          <h4>Upcoming Orders</h4>
          {message}
          {orderCards}
        </Container>
      </div>
    );
  }
}

export default UpcomingOrders;
