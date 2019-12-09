import React, { Component } from "react";
import axios from "axios";
import serverURL from "../../config";
import { Table, Row, Col } from "react-bootstrap";

class OrderDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.setState({ order_details: this.props.order_details });
    console.log(this.props.order_details);
    this.fetchOrderItems();
  }

  fetchOrderItems = () => {
    axios
      .get(`${serverURL}/api/orders/orderitems/${this.props.order_details._id}`)
      .then(response => {
        if (response.data[0]) {
          this.setState({
            order_items: response.data
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    let order_details = this.props.order_details;
    let itemsRender = [];
    let items = this.state.order_items;

    if (this.state && this.state.order_items) {
      if (items.length > 0) {
        items.map(item => {
          let itemRow = (
            <tr key={item._id}>
              <td colSpan="4" align="center">
                {item.item_name}
              </td>
              <td colSpan="4" align="center">
                {item.item_quantity}
              </td>
            </tr>
          );
          itemsRender.push(itemRow);
        });
      }
    }

    return (
      <Row>
        <Col>
          <Table style={{ width: "90%" }}>
            <thead align="center">
              <th colSpan="4">Item Name</th>
              <th colSpan="4">Quantity</th>
            </thead>
            <tbody>
              {itemsRender}
              <br />
              <br />
              <tr>
                <td colSpan="4">Sub Total</td>
                <td align="center">$ {order_details.sub_total}</td>
              </tr>
              <tr>
                <td colSpan="4">Tax</td>
                <td align="center">$ {order_details.tax}</td>
              </tr>
              <tr>
                <td colSpan="4">Delivery Charges</td>
                <td align="center">$ {order_details.delivery}</td>
              </tr>
              <tr>
                <td colSpan="4">
                  <b>Total</b>
                </td>
                <td align="center">
                  <b>$ {order_details.total}</b>
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>

        <Col>
          <Table>
            <thead align="center">
              <th>Payement Info</th>
            </thead>
            <tbody>
              <tr>
                <td colSpan="4">Customer Name:</td>
                <td>{order_details.customer.name}</td>
              </tr>
              <tr>
                <td colSpan="4">Delivery Address:</td>
                <td>{order_details.customer.address}</td>
              </tr>
              <tr>
                <td colSpan="4">Contact Number:</td>
                <td>{order_details.customer.phone_number}</td>
              </tr>
              <tr>
                <td colSpan="4">Payment Date:</td>
                <td>{order_details.order_date}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    );
  }
}

export default OrderDetails;
