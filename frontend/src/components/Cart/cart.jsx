import React, { Component } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import serverURL from "../../config";
import CartItem from "./cartitem";
import {
  Container,
  Col,
  Button,
  Row,
  Table,
  Card,
  Alert
} from "react-bootstrap";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      items: [],
      subtotal: 0,
      tax: 9.25,
      delivery: 5,
      buttonDisabled: false
    };
  }

  componentWillMount() {
    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = cart.concat(...JSON.parse(localStorage.getItem("cart")));

      this.setState({
        items: cart
      });
    }
  }

  componentDidMount() {
    this.calculateTotal();
  }

  handleReset = async () => {
    localStorage.removeItem("cart");
    await this.setState({ items: [], buttonDisabled: true });
  };

  handleDelete = async itemID => {
    console.log(itemID);
    const items = this.state.items.filter(item => item._id !== itemID);
    let buttonDisabled = false;
    if (items.length === 0) {
      buttonDisabled = true;
    }
    if (localStorage.getItem("cart")) {
      localStorage.setItem("cart", JSON.stringify(items));
      await this.setState({ items, buttonDisabled: buttonDisabled });
    }
    this.calculateTotal();
  };

  calculateTotal = async () => {
    let delivery = this.state.delivery;
    if (this.state.items.length === 0) {
      delivery = 0;
      await this.setState({ delivery });
    }
    let subtotal = this.state.items.reduce(
      (a, b) => a + (b["item_total_price"] || 0),
      0
    );

    let total = ((subtotal * (100 + this.state.tax)) / 100 + delivery).toFixed(
      2
    );
    let tax_amount = ((this.state.tax * subtotal) / 100).toFixed(2);
    await this.setState({ subtotal });
    await this.setState({ tax_amount });
    await this.setState({ total });
  };

  handleIncrement = async item => {
    const items = [...this.state.items];
    const index = items.indexOf(item);
    items[index] = { ...item };
    items[index].item_quantity++;
    items[index].item_total_price =
      items[index].item_price * items[index].item_quantity;

    if (localStorage.getItem("cart")) {
      localStorage.setItem("cart", JSON.stringify(items));
      await this.setState({ items });
    }
    this.calculateTotal();
  };

  handleDecrement = async item => {
    const items = [...this.state.items];
    const index = items.indexOf(item);
    items[index] = { ...item };
    if (items[index].item_quantity > 1) {
      items[index].item_quantity--;
    }
    items[index].item_total_price =
      items[index].item_price * items[index].item_quantity;

    if (localStorage.getItem("cart")) {
      localStorage.setItem("cart", JSON.stringify(items));
      await this.setState({ items });
    }
    this.calculateTotal();
  };

  placeOrder = e => {
    let data = {
      user_id: localStorage.getItem("user_id"),
      res_id: localStorage.getItem("cart_res_id"),
      status: "Placed",
      sub_total: this.state.subtotal,
      delivery: this.state.delivery,
      tax: this.state.tax_amount,
      total: this.state.total,
      cart_items: this.state.items
    };

    axios
      .post(`${serverURL}/api/cart/placeorder`, data)
      .then(response => {
        if (response.status === 200) {
          localStorage.removeItem("cart");
          localStorage.removeItem("cart_res_id");
          this.setState({
            message: response.data
          });
        }
      })
      .catch(error => {
        this.setState({
          message: error.response.data
        });
      });
  };
  render() {
    let menuitems = this.state.items.map(item => {
      return (
        <CartItem
          key={item._id}
          onDelete={this.handleDelete}
          onIncrement={this.handleIncrement}
          onDecrement={this.handleDecrement}
          item={item}
        />
      );
    });

    let redirectVar = null,
      message = null;

    if (this.state.message === "Order Placed") {
      redirectVar = <Redirect to="/customerorders" />;
    }
    if (this.state.message !== "Order Placed") {
      message = <Alert variant="warning">{this.state.message}</Alert>;
    }
    if (
      !localStorage.getItem("user_id") ||
      localStorage.getItem("is_owner") === "1"
    ) {
      redirectVar = <Redirect to="/login" />;
    }
    if (
      !localStorage.getItem("cart") ||
      localStorage.getItem("cart").length === 0 ||
      this.state.items.length === 0
    ) {
      // redirectVar = <Redirect to="/customerorders" />;
      message = <Alert variant="warning">"Your Cart is Empty"</Alert>;
    }

    return (
      <div>
        <div>{message}</div>
        <br />
        <Container>
          <center>
            <Card style={{ width: "90%" }}>
              <Table>
                <thead align="center">
                  <tr>
                    <th>Item Name</th>
                    <th></th>
                    <th>Quantity</th>
                    <th></th>
                    <th>Price</th>
                    <th>Total Price</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody align="center">{menuitems}</tbody>
              </Table>
            </Card>
            <br />
            <br />
            <br />
            <Row>
              <Col align="right">
                <Button variant="outline-danger" onClick={this.handleReset}>
                  Clear Cart
                </Button>
              </Col>
              <Col align="left">
                <Button
                  variant="danger"
                  onClick={this.placeOrder}
                  disabled={this.state.buttonDisabled}
                >
                  Place Order
                </Button>
              </Col>
            </Row>
            <br />
            <br />
            <br />
            <Card style={{ width: "50%" }}>
              <Table>
                <tbody align="center">
                  <tr>
                    <td colSpan="4">
                      <b>Sub Total</b>
                    </td>
                    <td align="center">
                      <b>$ {this.state.subtotal}</b>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="4">Tax ({this.state.tax}%)</td>
                    <td align="center">{this.state.tax_amount}</td>
                  </tr>
                  <tr>
                    <td colSpan="4">Delivery Charges</td>
                    <td align="center">$ {this.state.delivery.toFixed(2)}</td>
                  </tr>

                  <tr>
                    <td colSpan="4">
                      <b>Total</b>
                    </td>
                    <td align="center">
                      <b>$ {this.state.total}</b>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </center>
        </Container>
      </div>
    );
  }
}

export default Cart;
