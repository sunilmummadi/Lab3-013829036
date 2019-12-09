import React, { Component } from "react";
import RestaurantItemCard from "./restaurantitemcard";
import axios from "axios";
import serverURL from "../../../config";
import { Col, Row } from "react-bootstrap";

class RestaurantSection extends Component {
  constructor(props) {
    super(props);
    this.state = { menu_items: [] };
    this.fetchMenuItems();
  }

  //Handle delete click
  handleClick = () => {
    this.props.deleteItem();
    this.fetchMenuItems();
  };

  fetchMenuItems = () => {
    axios
      .get(`${serverURL}/api/items/${this.props.owner_user_id}`)
      .then(response => {
        if (response.status === 200) {
          this.setState({
            menu_items: response.data
          });
        }
      })
      .catch(err => {
        if (err.response && err.response.data) {
          console.log(err.response.data);
        }
      });
  };
  render() {
    let menu_section = this.props.menu_section;
    let itemsRender = null;

    if (
      this.state &&
      this.state.menu_items &&
      this.state.menu_items.length > 0
    ) {
      let items = this.state.menu_items.filter(
        menu_item => menu_item.menu_section_id === menu_section._id
      );

      if (items.length > 0) {
        itemsRender = items.map(item => {
          return (
            <Col>
              <RestaurantItemCard
                key={item._id}
                menu_item={item}
                onButtonClick={this.props.deleteItem}
              />
            </Col>
          );
        });
      } else {
        itemsRender = <h5>Add items in this section</h5>;
      }
      return itemsRender;
    }

    return (
      <div>
        <Row>{itemsRender}</Row>
      </div>
    );
  }
}

export default RestaurantSection;
