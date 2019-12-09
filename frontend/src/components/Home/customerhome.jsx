import React, { Component } from "react";
import "../../App.css";
import RestaurantCard from "./restaurantcard";
import PaginationComponent from "./pagination";
import axios from "axios";
import serverURL from "../../config";
import { paginate } from "../../paginate";
import {
  Container,
  Col,
  Row,
  InputGroup,
  FormControl,
  Alert,
  Form,
  DropdownButton,
  Button,
  Dropdown
} from "react-bootstrap";

class CustomerHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search_input: "",
      noRecord: false,
      restaurants: [],
      pageSize: 6,
      currentPage: 1
    };
    //  this.performSearch();
  }

  //Component did mount
  componentDidMount() {
    axios
      .get(`${serverURL}/api/home/restaurantsearch/_`)
      .then(response => {
        var cuisines = [];
        if (response.data) {
          for (var i = 0; i < response.data.length; i++) {
            cuisines.push(response.data[i].res_cuisine);
          }
          this.setState({
            restaurantList: response.data,
            restaurants: response.data,
            cuisineList: cuisines
          });
        }
      })
      .catch(error => {
        if (error.response && error.response.data) {
          console.log(error.response.data);
        }
      });
  }

  //Handle change function
  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value, noRecord: false });

    // this.performSearch();
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  //Search function
  performSearch = e => {
    e.preventDefault();

    var searchInput =
      typeof this.state.search_input === "undefined" ||
      this.state.search_input === ""
        ? "_"
        : this.state.search_input;

    console.log(searchInput);
    axios
      .get(`${serverURL}/api/home/restaurantsearch/${searchInput}`)
      .then(response => {
        var cuisines = [];
        if (response.data) {
          console.log(response.data);
          if (response.data === "No match") {
            this.setState({
              noRecord: true
            });
          } else {
            for (var i = 0; i < response.data.length; i++) {
              cuisines.push(response.data[i].res_cuisine);
            }
            this.setState({
              restaurantList: response.data,
              restaurants: response.data,
              cuisineList: cuisines,
              noRecord: false
            });
          }
        }
      })
      .catch(error => {
        if (error.response && error.response.data) {
          console.log(error.response.data);
        }
      });
  };

  //Cuisine Filter
  onCuisineSelect = e => {
    var filteredList = this.state.restaurantList.filter(
      restaurant => restaurant.res_cuisine === e.target.text
    );
    this.setState({
      restaurants: filteredList
    });
  };

  render() {
    let cuisineDropdown = null,
      restaurantcards = null,
      noRecordMessage = null;
    const { pageSize, currentPage, restaurants: allRestaurants } = this.state;
    const restaurants = paginate(allRestaurants, currentPage, pageSize);

    if (this.state && this.state.cuisineList) {
      cuisineDropdown = this.state.cuisineList.map(cuisine => {
        console.log(cuisine);
        return (
          <Dropdown.Item href="#" key={cuisine} onClick={this.onCuisineSelect}>
            {cuisine}
          </Dropdown.Item>
        );
      });
    }
    if (this.state && this.state.restaurants) {
      restaurantcards = restaurants.map(restaurant => {
        return (
          <Col sm={6} key={restaurant._id}>
            <RestaurantCard restaurant={restaurant} />
          </Col>
        );
      });
    }

    if (this.state && this.state.noRecord) {
      noRecordMessage = (
        <Alert variant="warning">
          No Results for {this.state.search_input}. Please try again.
        </Alert>
      );
    } else {
      noRecordMessage = null;
    }

    return (
      <div>
        <Container>
          {noRecordMessage}
          <br />
          <Form>
            <InputGroup className="mb-3">
              <FormControl
                onChange={this.handleChange}
                placeholder="Enter Search Term"
                aria-label="Search"
                aria-describedby="basic-addon2"
                bg="dark"
                text="white"
                name="search_input"
              />
              <InputGroup.Append>
                <Button variant="danger" onClick={this.performSearch}>
                  Search
                </Button>
              </InputGroup.Append>
              <DropdownButton
                as={InputGroup.Append}
                variant="outline-secondary"
                title="Cuisine"
                id="input-group-dropdown-2"
              >
                {cuisineDropdown}
              </DropdownButton>
            </InputGroup>
          </Form>
          <Row>{restaurantcards}</Row>
          <br />
          <PaginationComponent
            itemsCount={this.state.restaurants.length}
            pageSize={this.state.pageSize}
            currentPage={this.state.currentPage}
            onPageChange={this.handlePageChange}
            style={{ align: "center" }}
          />
        </Container>
        <Container></Container>
      </div>
    );
  }
}
export default CustomerHome;
