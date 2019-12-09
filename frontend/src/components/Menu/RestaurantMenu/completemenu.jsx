import React, { Component } from "react";
import { Container, Alert } from "react-bootstrap";
import axios from "axios";
import serverURL from "../../../config";
import RestaurantSection from "./restaurantsection";

class CompleteMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      owner_user_id: localStorage.getItem("user_id"),
      menu_sections: [],
      message: ""
    };

    this.fetchSections();
  }

  //Fetch Sections
  fetchSections = () => {
    axios
      .get(`${serverURL}/api/sections/${localStorage.getItem("user_id")}`)
      .then(response => {
        if (response.status === 200) {
          this.setState({
            menu_sections: response.data.restaurant.menu_sections
          });
        }
      })
      .catch(err => {
        if (err.response && err.response.data) {
          console.log(err.response.data);
        }
      });
  };

  deleteItem = menu_item => {
    let item_id = menu_item._id;
    let menu_section_id = menu_item.menu_section_id;
    const data = {
      item_id,
      menu_section_id,
      user_id: this.state.owner_user_id
    };
    axios
      .post(`${serverURL}/api/items/delete`, data)
      .then(response => {
        if (response.status === 200) {
          this.setState({
            message: response.data
          });
          this.fetchSections();
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
    let message = null,
      renderOutput = [];

    if (this.state.message !== "") {
      message = <Alert variant="warning">{this.state.message}</Alert>;
    }

    if (
      this.state &&
      this.state.menu_sections &&
      this.state.menu_sections.length > 0
    ) {
      renderOutput = this.state.menu_sections.map(section => {
        return (
          <div>
            <h3>{section.menu_section_name}</h3>
            <RestaurantSection
              key={section._id}
              owner_user_id={this.state.owner_user_id}
              menu_section={section}
              deleteItem={this.deleteItem}
            />
          </div>
        );
      });
    }
    return (
      <Container className="justify-content">
        <h1>Menu</h1>
        {message}
        <div>{renderOutput}</div>
      </Container>
    );
  }
}

export default CompleteMenu;
