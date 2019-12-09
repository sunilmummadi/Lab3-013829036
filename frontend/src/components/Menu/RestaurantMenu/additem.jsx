import React, { Component } from "react";
import {
  Form,
  Col,
  Row,
  Dropdown,
  Container,
  Button,
  Card,
  Alert
} from "react-bootstrap";
import axios from "axios";
import serverURL from "../../../config";

class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      menu_sections: []
    };
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

  //handle image change
  onImageChange = e => {
    console.log(e.target.files[0]);
    this.setState(
      {
        file: e.target.files[0],
        fileText: e.target.files[0].name
      },
      () => {
        console.log(this.state.file);
      }
    );
  };

  //Handle Image upload
  onUpload = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("itemImage", this.state.file);
    const configuration = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };

    axios
      .post(
        `${serverURL}/api/uploads/items/${this.state.item_id}`,
        formData,
        configuration
      )
      .then(response => {
        this.setState({
          fileText: "Choose file...",
          item_image: response.data,
          message: "image uploaded successfully"
        });
        console.log(this.state);
      })
      .catch(err => this.setState({ message: "error" }));
  };

  //Handle form submit
  onSubmit = e => {
    e.preventDefault();
    const data = {
      user_id: localStorage.getItem("user_id"),
      item_name: this.state.item_name,
      item_description: this.state.item_description,
      item_price: this.state.item_price,
      item_image: this.state.item_image || "",
      menu_section_id: this.state.menu_section_id,
      menu_section_name: this.state.menu_section_name
    };

    console.log(` menu sec name - ${this.state.menu_section_name}`);
    axios
      .post(`${serverURL}/api/items/insert`, data)
      .then(response => {
        this.setState({ message: response.data });
        console.log(response);
      })
      .catch(err => {
        if (err.response && err.response.data) {
          this.setState({ message: err.response.data });
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
            key={menu_section._id}
            onClick={this.handleSelection}
            name={menu_section.menu_section_name}
          >
            {menu_section.menu_section_name}
          </Dropdown.Item>
        );
      });
    }

    var imageSrc,
      fileText = this.state.fileText || "Choose image..";
    if (this.state) {
      imageSrc = `${serverURL}/api/uploads/items/${this.state.item_image}`;
    }

    return (
      <Container className="justify-content">
        <Row>
          <Col>
            <br />
            <br />
            <h3>Add New Item</h3>
            <br />
            <Form onSubmit={this.onSubmit}>
              {/* Item Name */}
              <Form.Group as={Row} controlId="formPlaintextItemName">
                <Form.Label column sm="2">
                  Item Name
                </Form.Label>
                <Col sm="4">
                  <Form.Control
                    style={{ width: "15rem" }}
                    type="text"
                    name="item_name"
                    placeholder="Item Name"
                    onChange={this.handleChange}
                  />
                </Col>
              </Form.Group>
              {/* Item price */}
              <Form.Group as={Row} controlId="item_price">
                <Form.Label column sm="2">
                  Price
                </Form.Label>
                <Col sm="4">
                  <Form.Control
                    style={{ width: "15rem" }}
                    type="text"
                    name="item_price"
                    placeholder="Enter Price.."
                    onChange={this.handleChange}
                  />
                </Col>
              </Form.Group>
              {/* Item Description */}
              <Form.Group as={Row} controlId="description">
                <Form.Label column sm="2">
                  Description
                </Form.Label>
                <Col sm="4">
                  <Form.Control
                    style={{ width: "25rem" }}
                    as="textarea"
                    name="item_description"
                    onChange={this.handleChange}
                  />
                </Col>
              </Form.Group>
              {/* Item Section */}
              <Form.Group as={Row} controlId="formPlaintextSection">
                <Form.Label column sm="2">
                  Section
                </Form.Label>
                <Col sm="10">
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      {this.state.menu_section_name}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>{section_options}</Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Form.Group>
              <Button type="sumbit">Add Item</Button>
            </Form>
            {message}
          </Col>
          <Col xs={6} md={4}>
            <center>
              <br />
              <br />
              <Card style={{ width: "12rem" }}>
                <Card.Img variant="top" src={imageSrc} />
              </Card>
              <form onSubmit={this.onUpload}>
                <br />
                <div class="custom-file" style={{ width: "80%" }}>
                  <input
                    type="file"
                    class="custom-file-input"
                    name="image"
                    accept="image/*"
                    onChange={this.onImageChange}
                    required
                  />
                  <label
                    class="custom-file-label"
                    htmlFor="image"
                    style={{ textAlign: "left" }}
                  >
                    {fileText}
                  </label>
                </div>
                <br />
                <br />
                <Button type="submit" variant="primary">
                  Upload
                </Button>
              </form>
            </center>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default AddItem;
