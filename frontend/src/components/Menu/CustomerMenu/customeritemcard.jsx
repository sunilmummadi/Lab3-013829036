import React, { Component } from "react";
import serverURL from "../../../config";
import { Card, Button, Col, Row } from "react-bootstrap";

class CustomerItemCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonDisabled: false
    };
  }
  handleClick = e => {
    this.setState({
      buttonDisabled:true
    })
    e.target.textContent = "Added";
    this.props.onButtonClick(this.props.menu_item);
  };
  render() {
    let imageSrc = `${serverURL}/api/uploads/items/
      ${this.props.menu_item.item_image}`;
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
                variant="danger"
                style={{ color: "#FFF" }}
                onClick={this.handleClick}
                name={this.props.menu_item.item_id}
                disabled={this.state.buttonDisabled}
              >
                Add to Cart
              </Button>
            </Row>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default CustomerItemCard;
