import React, { Component } from "react";
import axios from "axios";
import serverURL from "../../../config";
import CustomerItemCard from "./customeritemcard";
import { Row, Col } from "react-bootstrap";

class CustomerSection extends Component {
  constructor(props) {
    super(props);
    this.setState({
      menu_items: []
    });
    this.fetchMenuItems();
  }

  //get menu items
  fetchMenuItems = () => {
    axios
      .get(`${serverURL}/api/items/${this.props.owner_user_id}`)
      .then(response => {
        if (response.data) {
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
            <Col sm="6">
              <CustomerItemCard
                menu_item={item}
                onButtonClick={this.props.addToCart}
              />
            </Col>
          );
        });
      } else {
        itemsRender = <h5>Section is Empty</h5>;
      }
    }

    return (
      <div>
        <Row>
          <h1>{menu_section.menu_section_name}</h1>
        </Row>
        <Row>{itemsRender}</Row>
      </div>
    );
  }
}

export default CustomerSection;
