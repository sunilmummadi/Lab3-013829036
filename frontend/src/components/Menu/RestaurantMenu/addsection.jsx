import React, { Component } from "react";
import { Form, Col, Row, Container, Button, Alert } from "react-bootstrap";
import axios from "axios";
import serverURL from "../../../config";

class AddSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      menu_section_name: "",
      menu_sections: []
    };
    this.fetchSections();
  }

  //Handle Form Changes
  handleChange = e => {
    e.preventDefault();
    console.log(` name - ${e.target.name}`);
    console.log(` value - ${e.target.value}`);
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(this.state);
  };

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

  //Delete Section
  deleteSection = e => {
    const data = {
      menu_section_id: e.target.name,
      user_id: localStorage.getItem("user_id")
    };
    axios
      .post(`${serverURL}/api/sections/delete`, data)
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

  //On Form Submit
  onSubmit = e => {
    e.preventDefault();
    const data = {
      user_id: localStorage.getItem("user_id"),
      restaurant_id: localStorage.getItem("restaurant_id"),
      menu_section_name: this.state.menu_section_name
    };
    console.log(data);
    axios
      .post(`${serverURL}/api/sections/insert`, data)
      .then(response => {
        if (response.status === 200) {
          this.fetchSections();
        }
        this.setState({
          message: response.data
        });
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
      menuSectionsList = null;
    if (this.state.message !== "") {
      message = <Alert variant="success">{this.state.message}</Alert>;
    }

    if (
      this.state &&
      this.state.menu_sections &&
      this.state.menu_sections.length > 0
    ) {
      menuSectionsList = this.state.menu_sections.map(menu_section => {
        return (
          <Row key={menu_section._id}>
            <Col sm="2" align="left">
              <p>{menu_section.menu_section_name}</p>
            </Col>
            <Col>
              <Button
                variant="link"
                onClick={this.deleteSection}
                name={menu_section._id}
              >
                Delete
              </Button>
            </Col>
          </Row>
        );
      });
    }

    return (
      <Container className="justify-content">
        <br />
        <h3>Add New Section</h3>
        <br />
        <Form onSubmit={this.onSubmit}>
          <Form.Group as={Row} controlId="formPlaintextItemName">
            <Form.Label column sm="2">
              Section
            </Form.Label>
            <Col sm="4">
              <Form.Control
                style={{ width: "15rem" }}
                type="text"
                name="menu_section_name"
                placeholder="Lunch"
                onChange={this.handleChange}
              />
            </Col>
            <Col sm="6">
              <Button type="sumbit">Add Section</Button>
            </Col>
          </Form.Group>
        </Form>
        {message}
        <br />
        <br />
        <br />
        <Container style={{ width: "100%", align: "left" }}>
          <Row>
            <Col sm="2">
              <h4>Sections</h4>
            </Col>
          </Row>
          {menuSectionsList}
        </Container>
      </Container>
    );
  }
}

export default AddSection;
