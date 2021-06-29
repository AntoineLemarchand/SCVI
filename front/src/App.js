import React, { Component } from "react";
import axios from "axios";

export default class App extends Component {
  state = {
    posts: []
  }

  componentDidMount() {
    axios.get('http://localhost:9000/posts')
      .then(res => {
        const posts = res.data;
        this.setState({ posts })
      })
  }

  render() {
    return (
      <div className="APITest">
        <h1>yooooo</h1>
        <ul>
          {this.state.posts.map(posts => <li>{posts.PTitle}</li>)}
        </ul>
      </div>
    );
  }
}
