import React, { Component } from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import serverURL from "../../../config";

class RestaurantItemCard extends Component {
  handleClick = () => {
    this.props.onButtonClick(this.props.menu_item);
  };

  render() {
    let imageSrc = `${serverURL}/api/uploads/items/${this.props.menu_item.item_image}`;
    return (
      <Card
        bg="dark"
        text="white"
        style={{ width: "100%", height: "9rem", margin: "2%" }}
      >
        <Row>
          <Col>
            <Card.Img
              style={{ width: "10rem", height: "8.85rem" }}
              src={imageSrc}
            />
          </Col>
          <Col>
            <br />
            <Row>
              <Card.Title>{this.props.menu_item.item_name}</Card.Title>
            </Row>
            <br />
            <Row>
              <Card.Text>${this.props.menu_item.item_price}</Card.Text>
            </Row>
          </Col>
          <Col>
            <br />
            <Row>
              <Card.Text>{this.props.menu_item.item_description}</Card.Text>
            </Row>
          </Col>
          <Col>
            <br />
            <Row>
              <Button
                variant="link"
                style={{ color: "#FFF" }}
                onClick={this.handleClick}
                name={this.props.menu_item._id}
              >
                Delete
              </Button>
            </Row>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default RestaurantItemCard;
