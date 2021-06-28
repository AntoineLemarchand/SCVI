import React, { Component } from "react";

export default class App extends Component {
  constructor(props){
    super(props);
    this.state= { apiResponse:"" };
  }

  callAPI(){
    fetch("http://localhost:9000/testAPI")
    .then(res => res.text())
    .then(res => this.setState({ apiResponse: res }))
    .catch(err => err);
  }

  componentWillMount() {
    this.callAPI();
  }

  render(){
    return (
      <div className="APITest">
        <p className="saidTest">{this.state.apiResponse}</p>
      </div>
    )
  }
}
