import React, { Component } from "react";
import { Button } from "react-bootstrap";
import deleteIcon from "../../images/deleteicon.jpeg";

class CartItem extends Component {
  render() {
    return (
      <tr>
        <td>
          <p>{this.props.item.item_name}</p>
        </td>
        <td align="right">
          <Button
            variant="outline-danger"
            onClick={() => this.props.onDecrement(this.props.item)}
          >
            -
          </Button>
        </td>
        <td>
          <span width="10%">{this.props.item.item_quantity}</span>
        </td>
        <td align="left">
          <Button
            variant="outline-danger"
            onClick={() => this.props.onIncrement(this.props.item)}
          >
            +
          </Button>
        </td>
        <td>
          <span>${this.props.item.item_price}</span>
        </td>
        <td>
          <span>${this.props.item.item_total_price}</span>
        </td>
        <td>
          <img
            onClick={() => this.props.onDelete(this.props.item._id)}
            width="30"
            height="30"
            alt="delete"
            src={deleteIcon}
          ></img>
        </td>
      </tr>
    );
  }
}

export default CartItem;
