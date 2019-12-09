import React, { Component } from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import serverURL from "../../config";

class RestaurantCard extends Component {
  render() {
    var resData = this.props.restaurant;
    console.log(this.props.restaurant);
    let imageSrc = `${serverURL}/api/uploads/restaurant/${this.props.restaurant.owner_user_id}`;
    return (
      <Card
        bg="dark"
        text="white"
        style={{ width: "100%", height: "9rem", margin: "2%" }}
      >
        <Row>
          <Col>
            <Card.Img
              variant="top"
              style={{ width: "10rem", height: "9rem" }}
              src={imageSrc}
            />
          </Col>
          <Col>
            <Card.Body>
              <Row>
                <Col>
                  <Row>
                    <Card.Title>{this.props.restaurant.res_name}</Card.Title>
                  </Row>
                  <br />
                  <Row>
                    <Card.Text>{this.props.restaurant.res_cuisine}</Card.Text>
                  </Row>
                </Col>
                <Col align="left">
                  <br />
                  <br />
                  <Row>
                    <Link to={{ pathname: "/customermenu", state: resData }}>
                      <Button variant="danger">Visit</Button>
                    </Link>
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default RestaurantCard;
