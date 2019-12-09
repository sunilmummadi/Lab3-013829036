import React, { Component } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import serverURL from "../../../config";
import CustomerSection from "./customersection";
import { Card, Container, Col, Row } from "react-bootstrap";

class CustomerMenu extends Component {
  constructor(props) {
    super(props);
    this.setState({
      menu_sections: []
    });
    this.getSections();
  }

  getSections = () => {
    if (this.props.location.state) {
      console.log(this.props.location.state);
      axios
        .get(
          `${serverURL}/api/sections/${this.props.location.state.owner_user_id}`
        )
        .then(response => {
          console.log(response);
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
    }
  };

  addToCart = menu_item => {
    menu_item.item_quantity = 1;
    menu_item.item_total_price = menu_item.item_price * menu_item.item_quantity;
    let item = [menu_item];
    let cartItems = [];

    console.log(this.props.location.state);
    if (localStorage.getItem("cart_res_id") !== this.props.location.state._id) {
      localStorage.setItem("cart", cartItems);
    }

    if (localStorage.getItem("cart")) {
      cartItems.push(...JSON.parse(localStorage.getItem("cart")));
    }

    console.log(item);
    console.log(cartItems);
    var index = cartItems.findIndex(cart => cart.item_id === item[0]._id);
    if (index === -1) {
      cartItems = cartItems.concat(item);
      localStorage.setItem("cart_res_id", this.props.location.state._id);
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  };

  render() {
    let redirectVar = null,
      resImageSrc = null,
      resName,
      resPhone,
      resAddress,
      resCuisine,
      restaurant = this.props.location.state;

    if (!this.props.location.state) {
      redirectVar = <Redirect to="/home" />;
    }

    if (restaurant) {
      resImageSrc = `${serverURL}/api/uploads/restaurant/${restaurant.res_image}`;
      resName = restaurant.res_name;
      resAddress = restaurant.res_address;
      resAddress = restaurant.address;
      resPhone = restaurant.phone_number;
      resCuisine = restaurant.res_cuisine;
    }

    let renderOutput = null;
    if (
      this.state &&
      this.state.menu_sections &&
      this.state.menu_sections.length > 0
    ) {
      renderOutput = this.state.menu_sections.map(section => {
        return (
          <CustomerSection
            owner_user_id={this.props.location.state.owner_user_id}
            menu_section={section}
            addToCart={this.addToCart}
          />
        );
      });
    }

    return (
      <div>
        {redirectVar}

        <Container>
          <Card
            bg="white"
            border="danger"
            text="danger"
            style={{ width: "100%", height: "15rem" }}
          >
            <Row>
              <Col sm="2">
                <Card.Img
                  style={{
                    width: "15rem",
                    height: "14rem",
                    borderColor: "danger"
                  }}
                  src={resImageSrc}
                />
              </Col>

              <Col sm="2">
                <br />
                <Card.Title>
                  <h1>{resName}</h1>
                </Card.Title>
                <br />
                <br />
                <br />
                <br />
                <br />
                <Card.Text>
                  <h5>Cuisine: {resCuisine}</h5>
                </Card.Text>
              </Col>
              <Col sm="2"></Col>
              <Col sm="2"></Col>
              <Col sm="2"></Col>
              <Col sm="2">
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <Card.Text>
                  <h5>Address : {resAddress}</h5>
                  <h5>Phone : {resPhone}</h5>
                </Card.Text>
              </Col>
            </Row>
          </Card>
          <br />
          {renderOutput}
        </Container>
      </div>
    );
  }
}

export default CustomerMenu;
