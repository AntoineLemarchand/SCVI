import React, { Component } from "react";
import Routes from "./components/Route";
import { Helmet } from "react-helmet";

const bodyStyle = {
  width: "100vw",
  height: "100vh",
  backgroundColor: "#282828",
  overflowY: "hidden",
  overflowX: "hidden",
}

export default class App extends Component {

  render() {
    return (
      <div id="App" style={bodyStyle}>
        <Helmet>
          <title>SCVI</title>
        </Helmet>
        <Routes/>
      </div>
      
    );
  }
}
