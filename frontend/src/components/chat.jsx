import React, { Component } from "react";
import axios from "axios";
import serverURL from "../config";
import {
  Col,
  Row,
  Card,
  Container,
  Button,
  Form,
  Modal
} from "react-bootstrap";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      alert: ""
    };
    this.getChats();
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleShow = async e => {
    // let order_id = e.target.name;
    // let index = this.state.upcoming_orders.findIndex(order=>order._id === order_id);
    // let messages = this.state.upcoming_orders[index].messages
    await this.setState({
      show: true
    });
  };

  handleClose = async () => {
    await this.setState({
      show: false
    });
  };

  handleSend = () => {
    let data = {
      order_id: this.props.order._id,
      sender_id: localStorage.getItem("user_id"),
      sender_name: localStorage.getItem("name"),
      message_content: this.state.message_content
    };
    console.log("-------data--------");
    console.log(data);
    axios
      .post(`${serverURL}/api/chat/new_message`, data)
      .then(response => {
        if (response.status === 200) {
          console.log(response.data);
          this.setState({
            upcoming_orders: response.data,
            message_content: ""
          });
          this.getChats();
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

  getChats = () => {
    axios
      .get(`${serverURL}/api/chat/${this.props.order._id}`)
      .then(response => {
        if (response.status === 200) {
          // console.log(response.data);
          this.setState({
            messages: response.data
          });
        }
      })
      .catch(err => {
        if (err.response && err.response.data) {
          this.setState({
            alert: err.response.data
          });
        }
      });
  };

  render() {
    let messageList,
      color,
      align,
      sendMessage = null;
    let text = "black";

    if (this.props) {
      messageList = this.state.messages.map(message => {
        if (message.sender_id === localStorage.getItem("user_id")) {
          color = "danger";
          align = "right";
          text = "white";
        }
        let card = (
          <>
            <Card
              bg={color}
              text={text}
              key={message._id}
              align={align}
              style={{ margin: "2%" }}
            >
              <Card.Header>{message.message_content}</Card.Header>
            </Card>
            <p>{message.message_time}</p>
          </>
        );

        let col = null;

        if (message.sender_id === localStorage.getItem("user_id")) {
          col = (
            <Row>
              <Col md={{ span: 8, offset: 4 }}>{card}</Col>
            </Row>
          );
        } else {
          col = (
            <Row>
              <Col md={{ span: 8, offset: 0 }}>{card}</Col>
            </Row>
          );
        }
        return <Container>{col}</Container>;
      });
    }
    sendMessage = (
      <Form.Control
        style={{ width: "100%" }}
        type="text"
        name="message_content"
        placeholder="Say something"
        value={this.state.message_content}
        onChange={this.handleChange}
      />
    );
    return (
      <>
        <Button
          variant="danger"
          name={this.props.order._id}
          onClick={this.handleShow}
        >
          Chat
        </Button>

        <Modal
          size="lg"
          show={this.state.show}
          onHide={this.handleClose}
          scrollable={true}
        >
          <Modal.Header closeButton>
            <Modal.Title>Chat</Modal.Title>
          </Modal.Header>
          <Modal.Body>{messageList}</Modal.Body>
          <Modal.Footer>
            <Container>
              <Row>
                <Col sm="11">{sendMessage}</Col>
                <Col sm="1" style={{ align: "right" }}>
                  <Button variant="danger" onClick={this.handleSend}>
                    Send
                  </Button>
                </Col>
              </Row>
            </Container>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default Chat;
