import React, { Component } from "react";
import axios from "axios";

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {text: ''}
  }

  state = {
    text: 'héhé'
  }

  componentDidMount() {
    axios.get('http://localhost:9000/testAPI')
      .then(res => {
        const data = res.router;
        this.setState({text: `${data}`})
      })
  }

  render() {
    return (
      <div className="APITest">
        <h1>yooooo</h1>
        <p id="saidTest">{ this.text }</p>
      </div>
    );
  }
}
