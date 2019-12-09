import React, { Component } from "react";
import axios from "axios";
import serverURL from "../../config";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { customerProfileFetchAction } from "../../actions/customerProfileActions";
import { customerProfileUpdateAction } from "../../actions/customerProfileActions";

import { Row, Button, Col, Card, Alert } from "react-bootstrap";

class CustomerProfileComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    const data = {
      user_id: localStorage.getItem("user_id")
    };

    this.props.customerProfileFetchAction(data);
  }

  componentWillReceiveProps(nextProps) {
    console.log("next props will receive");
    console.log(nextProps);
    let user_details;
    if (nextProps.customer_profile_fetch_message)
      user_details = {
        user_id:
          nextProps.customer_profile_fetch_message.user_id ||
          this.state.user_id,
        name: nextProps.customer_profile_fetch_message.name || this.state.name,
        email_id:
          nextProps.customer_profile_fetch_message.email_id ||
          this.state.email_id,
        address:
          nextProps.customer_profile_fetch_message.address ||
          this.state.address,
        phone_number:
          nextProps.customer_profile_fetch_message.phone_number ||
          this.state.phone_number,
        user_image:
          nextProps.customer_profile_fetch_message.user_image ||
          this.state.user_image
      };

    this.setState(user_details);
  }

  //Profile UPDATE
  onUpdate = e => {
    //prevent page from refresh
    e.preventDefault();
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    let data = {
      user_id: localStorage.getItem("user_id"),
      email_id: this.state.email_id,
      name: this.state.name,
      password: this.state.password || "",
      address: this.state.address,
      phone_number: this.state.phone_number
    };

    this.props.customerProfileUpdateAction(data);
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

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

  onUpload = e => {
    e.preventDefault();
    const formData = new FormData();
    // console.log(user_id);
    formData.append("userImage", this.state.file);
    console.log(`${formData} i shere`);
    const configuration = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };

    axios
      .post(
        `${serverURL}/api/uploads/user/${this.state.user_id}`,
        formData,
        configuration
      )
      .then(response => {
        alert("image uploaded successfully");
        this.setState({
          fileText: "Choose file...",
          user_image: response.data
        });
        console.log(this.state);
      })
      .catch(err => alert("error"));
  };

  render() {
    let imageSrc,
      fileText = this.state.fileText || "Choose image..";
    if (this.state) {
      imageSrc = `${serverURL}/api/uploads/user/${this.state.user_image}`;
    }

    let alert = null;
    let message = null;
    console.log(this.props);
    if (
      this.props.customer_profile_update_message &&
      typeof "this.props.customer_profile_update_message" === "String"
    ) {
      console.log(this.props.customer_profile_update_message);
      message = this.props.customer_profile_update_message;
      alert = <Alert variant="warning">{message}</Alert>;
    }
    return (
      <div>
        <div class="container-fluid">
          {alert}
          <Row>
            <Col>
              <form class="update-form" onSubmit={this.onUpdate}>
                <div class="update-main-div">
                  <div class="panel">
                    <h2>Customer Profile</h2>
                    <p></p>
                  </div>
                  {/* Name field */}
                  <div class="form-group">
                    <label>Name</label>
                    <input
                      class="form-control"
                      name="name"
                      type="text"
                      onChange={this.onChange}
                      value={this.state.name}
                      placeholder="John Snow"
                    />
                  </div>
                  {/* Email field */}
                  <div class="form-group">
                    <label>Email</label>
                    <input
                      class="form-control"
                      type="email"
                      name="email_id"
                      value={this.state.email_id}
                      disabled
                      placeholder="Email"
                    />
                  </div>
                  {/* Password */}
                  <div class="form-group">
                    <label>New Password</label>
                    <input
                      class="form-control"
                      type="password"
                      name="password"
                      onChange={this.onChange}
                      placeholder="New Password"
                    />
                  </div>
                  {/* Address */}
                  <div class="form-group">
                    <label>Address</label>
                    <input
                      class="form-control"
                      type="text"
                      name="address"
                      onChange={this.onChange}
                      value={this.state.address}
                      placeholder="Street 1"
                    />
                  </div>
                  {/* Phone Number field */}
                  <div class="form-group">
                    <label>Phone Number</label>
                    <input
                      type="number"
                      class="form-control"
                      name="phone_number"
                      onChange={this.onChange}
                      value={this.state.phone_number}
                      placeholder="9000010000"
                    />
                  </div>
                  <button type="submit" class="btn btn-primary">
                    Update Profile
                  </button>
                  <Link to="/home">
                    <button class="btn btn-primary">Cancel</button>
                  </Link>
                </div>
              </form>
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
                    <label class="custom-file-label" for="image">
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
        </div>
      </div>
    );
  }
}
//component.proptypes will provide action with proptypes and reducer object mapping
CustomerProfileComponent.propTypes = {
  customerProfileUpdateAction: PropTypes.func.isRequired,
  customer_profile_update_message: PropTypes.object.isRequired,

  customerProfileFetchAction: PropTypes.func.isRequired,
  customer_profile_fetch_message: PropTypes.object.isRequired
};

//mapping reducer object to a variable object
const mapStateToProps = state => {
  console.log("redux state");
  console.log(state);
  return {
    customer_profile_update_message:
      state.customerProfileReducer.customer_profile_update_message,
    customer_profile_fetch_message:
      state.customerProfileReducer.customer_profile_fetch_message
  };
};

// connecting props mapping to action and component
export default connect(
  mapStateToProps,
  { customerProfileUpdateAction, customerProfileFetchAction }
)(CustomerProfileComponent);
