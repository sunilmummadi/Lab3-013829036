import React, { Component } from "react";
import axios from "axios";
import serverURL from "../../../config";
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
      .get(
        `${serverURL}/api/orders/orderitems/${this.props.order_details._id}`
      )
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
        items.forEach(item => {
          let itemRow = (
            <tr>
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
        <Col align="center">
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
      </Row>
    );
  }
}

export default OrderDetails;
