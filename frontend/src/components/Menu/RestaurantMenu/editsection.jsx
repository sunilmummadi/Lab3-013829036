import React, { Component } from "react";
import {
  Form,
  Col,
  Row,
  Container,
  Button,
  Alert,
  Dropdown
} from "react-bootstrap";
import axios from "axios";
import serverURL from "../../../config";

class EditSection extends Component {
  constructor(props) {
    super(props);
    this.state = { message: "", menu_sections: [], menu_section_name: "" };
    this.fetchSections();
  }

  //handle section selection
  handleSelection = e => {
    e.preventDefault();
    let section_name = e.target.name;
    let section_details = this.state.menu_sections.filter(
      section => section.menu_section_name === section_name
    );
    console.log({ section_details });
    this.setState({
      menu_section_name: section_details[0].menu_section_name,
      menu_section_id: section_details[0]._id
    });
  };

  // handle form changes
  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
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

  //On Form Submit
  onSubmit = e => {
    e.preventDefault();
    const data = {
      user_id: localStorage.getItem("user_id"),
      menu_section_name: this.state.menu_section_name,
      menu_section_id: this.state.menu_section_id
    };
    console.log(data);
    axios
      .post(`${serverURL}/api/sections/update`, data)
      .then(response => {
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
    let message = null;

    if (this.state.message !== "") {
      message = <Alert variant="success">{this.state.message}</Alert>;
    }

    let section_options = null;
    if (
      this.state &&
      this.state.menu_sections &&
      this.state.menu_sections.length > 0
    ) {
      section_options = this.state.menu_sections.map(menu_section => {
        return (
          <Dropdown.Item
            key={menu_section.menu_section_id}
            onClick={this.handleSelection}
            name={menu_section.menu_section_name}
          >
            {menu_section.menu_section_name}
          </Dropdown.Item>
        );
      });
    }

    return (
      <Container className="justify-content">
        <br />
        <h3>Update Section</h3>
        <br />
        {/* section dropdown */}
        <Form onSubmit={this.onSubmit}>
          <Form.Group as={Row} controlId="formPlaintextSection">
            <Col sm="2">
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Select Section
                </Dropdown.Toggle>
                <Dropdown.Menu>{section_options}</Dropdown.Menu>
              </Dropdown>
            </Col>
          </Form.Group>
          {/* section update */}
          <Form.Group as={Row} controlId="formPlaintextItemName">
            <Form.Label column sm="2">
              Change to
            </Form.Label>
            <Col sm="4">
              <Form.Control
                style={{ width: "15rem" }}
                type="text"
                name="menu_section_name"
                placeholder="Lunch"
                onChange={this.handleChange}
                value={this.state.menu_section_name}
              />
            </Col>
            <Col sm="6">
              <Button type="sumbit">Update</Button>
            </Col>
          </Form.Group>
        </Form>
        {message}
      </Container>
    );
  }
}

export default EditSection;
