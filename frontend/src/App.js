import React, { Component } from "react";
import "./App.css";
import Main from "./components/main";
import { BrowserRouter } from "react-router-dom";

class App extends Component {
  render() {
    return (
      //Use Browser Router to route to different pages
      <BrowserRouter>
        <div>
          {/* App Component Has a Child Component called Main*/}
          <Main />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
