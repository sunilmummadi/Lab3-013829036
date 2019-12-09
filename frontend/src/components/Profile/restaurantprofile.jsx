import React, { Component } from "react";
import axios from "axios";
import serverURL from "../../config";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Alert } from "react-bootstrap";
import {
  restaurantProfileFetchAction,
  restaurantProfileUpdateAction
} from "../../actions/restaurantProfileActions";

import { Row, Button, Col, Card } from "react-bootstrap";

class RestaurantProfileComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    console.log("next props will receive");
    console.log(nextProps);
    if (nextProps.restaurant_profile_fetch_message)
      this.setState({
        user_id:
          nextProps.restaurant_profile_fetch_message.user_id ||
          this.state.user_id,
        name:
          nextProps.restaurant_profile_fetch_message.name || this.state.name,
        email_id:
          nextProps.restaurant_profile_fetch_message.email_id ||
          this.state.email_id,
        address:
          nextProps.restaurant_profile_fetch_message.address ||
          this.state.address,
        phone_number:
          nextProps.restaurant_profile_fetch_message.phone_number ||
          this.state.phone_number,
        res_name:
          nextProps.restaurant_profile_fetch_message.restaurant.res_name ||
          this.state.res_name,
        res_cuisine:
          nextProps.restaurant_profile_fetch_message.restaurant.res_cuisine ||
          this.state.res_cuisine,
        res_zip_code:
          nextProps.restaurant_profile_fetch_message.restaurant.res_zip_code ||
          this.state.res_zip_code,
        user_image:
          nextProps.restaurant_profile_fetch_message.user_image ||
          this.state.user_image,
        res_image:
          nextProps.restaurant_profile_fetch_message.restaurant.res_image ||
          this.state.res_image
      });
  }

  componentWillMount() {
    this.setState({
      user_id: localStorage.getItem("user_id")
    });
    const data = {
      user_id: localStorage.getItem("user_id")
    };

    this.props.restaurantProfileFetchAction(data);
  }

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
      phone_number: this.state.phone_number,
      res_name: this.state.res_name,
      res_cuisine: this.state.res_cuisine,
      res_zip_code: this.state.res_zip_code
    };
    this.props.restaurantProfileUpdateAction(data);
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onOwnerImageChange = e => {
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

  onResImageChange = e => {
    this.setState(
      {
        file_res: e.target.files[0],
        fileText_res: e.target.files[0].name
      },
      () => {
        console.log(this.state.file_res);
      }
    );
  };

  onOwnerUpload = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userImage", this.state.file);
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    const configuration = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };

    console.log(this.state.user_id);
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

  onResUpload = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("resImage", this.state.file_res);
    const configuration = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };

    axios
      .post(
        `${serverURL}/api/uploads/restaurant/${this.state.user_id}`,
        formData,
        configuration
      )
      .then(response => {
        alert("image uploaded successfully");
        this.setState({
          fileText_res: "Choose file...",
          res_image: response.data
        });
        console.log(this.state);
      })
      .catch(err => alert("Res error"));
  };

  render() {
    let alert = null;
    let message = null;
    console.log(this.props);
    if (
      this.props.restaurant_profile_update_message &&
      typeof "this.props.restaurant_profile_update_message" === "String"
    ) {
      console.log(this.props.restaurant_profile_update_message);
      message = this.props.restaurant_profile_update_message;
      alert = <Alert variant="warning">{message}</Alert>;
    }

    let ownimageSrc,
      resimageSrc,
      fileText = this.state.fileText || "Choose image..",
      fileText_res = this.state.fileText_res || "Choose restaurant image..";
    console.log(`image - ${this.state.user_image}`);
    console.log(this.state);
    if (this.state) {
      ownimageSrc = `${serverURL}/api/uploads/user/${this.state.user_image}`;
      resimageSrc = `${serverURL}/api/uploads/restaurant/${this.state.res_image}`;
    }

    return (
      <div>
        <div class="container-fluid">
          <Row>
            <Col>
              <form class="update-form" onSubmit={this.onUpdate}>
                <div class="update-main-div">
                  <div>{alert}</div>

                  <div class="panel">
                    <h2>Restaurant Profile</h2>
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

                  {/* Restaurant Name */}
                  <div class="form-group">
                    <label>Restaurant Name</label>
                    <input
                      class="form-control"
                      name="res_name"
                      type="text"
                      onChange={this.onChange}
                      value={this.state.res_name}
                      placeholder="Chipotle"
                    />
                  </div>

                  {/* Cuisine */}
                  <div class="form-group">
                    <label>Cuisine</label>
                    <input
                      class="form-control"
                      name="res_cuisine"
                      type="text"
                      onChange={this.onChange}
                      value={this.state.res_cuisine}
                      placeholder="Mexican"
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
                  {/* New Password */}
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

                  {/* Zipcode */}
                  <div class="form-group">
                    <label>Zip Code</label>
                    <input
                      class="form-control"
                      name="res_zip_code"
                      type="text"
                      onChange={this.onChange}
                      value={this.state.res_zip_code}
                      placeholder="95112"
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
              <Row>
                <center>
                  <br />
                  <br />
                  <Card style={{ width: "12rem" }}>
                    <Card.Img variant="top" src={ownimageSrc} />
                  </Card>
                  <form onSubmit={this.onOwnerUpload}>
                    <br />
                    <div class="custom-file" style={{ width: "80%" }}>
                      <input
                        type="file"
                        class="custom-file-input"
                        name="image"
                        accept="image/*"
                        onChange={this.onOwnerImageChange}
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
              </Row>
              <Row>
                <center>
                  <br />
                  <br />
                  <Card style={{ width: "12rem" }}>
                    <Card.Img variant="top" src={resimageSrc} />
                  </Card>
                  <form onSubmit={this.onResUpload}>
                    <br />
                    <div class="custom-file" style={{ width: "80%" }}>
                      <input
                        type="file"
                        class="custom-file-input"
                        name="image"
                        accept="image/*"
                        onChange={this.onResImageChange}
                        required
                      />
                      <label class="custom-file-label" for="image">
                        {fileText_res}
                      </label>
                    </div>
                    <br />
                    <br />
                    <Button type="submit" variant="primary">
                      Upload
                    </Button>
                  </form>
                </center>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
//component.proptypes will provide action with proptypes and reducer object mapping
RestaurantProfileComponent.propTypes = {
  restaurantProfileUpdateAction: PropTypes.func.isRequired,
  restaurant_profile_update_message: PropTypes.object.isRequired,

  restaurantProfileFetchAction: PropTypes.func.isRequired,
  restaurant_profile_fetch_message: PropTypes.object.isRequired
};

//mapping reducer object to a variable object
const mapStateToProps = state => {
  console.log("redux state");
  console.log(state);
  return {
    restaurant_profile_update_message:
      state.restaurantProfileReducer.restaurant_profile_update_message,
    restaurant_profile_fetch_message:
      state.restaurantProfileReducer.restaurant_profile_fetch_message
  };
};

// connecting props mapping to action and component
export default connect(
  mapStateToProps,
  { restaurantProfileUpdateAction, restaurantProfileFetchAction }
)(RestaurantProfileComponent);
