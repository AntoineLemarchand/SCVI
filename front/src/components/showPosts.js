import React, { Component } from "react";
import { Link } from "react-router-dom";
import Moment from 'moment';
import axios from "axios";

const PostsStyle = {
  height: "90vh",
  width: "100vw",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  overflowY: "scroll"
}

const PostStyle = { 
  width: "60vw",
  borderRadius: "10px",
  color: "#ebdbb2",
  backgroundColor: "#1d2021",
  boxShadow: "5px 5px 10px black ",
  margin: "10vh 0 0 0",
  padding: "0 0 0 2vh",
  cursor: "pointer",
  textDecoration: "none",
};

export default class ShowPosts extends Component {
  state = {
    api: []
  }

  componentDidMount() {
    axios.get('http://localhost:9000/posts')
      .then(res => {
        const api = res.data;
        this.setState({ api })
      })
  }

  render() {
    return (
      <div id="Posts" style={PostsStyle}>
        {this.state.api.map(api =>
        <Link key={api.PostID} to={{pathname: (`/post/${api.PostID}`), 
          state: {
            id: api.PostID, 
            Title: api.PTitle, 
            Writer: api.Writer, 
            Date: Moment(api.Pdate).format('DD/MM/YYYY'),
            Body: api.PBody
          }}} 
          style={PostStyle}>

          <h2 id="PostTitle">{api.PTitle}</h2>
          <p id="author">{`Par ${api.Writer} le ${Moment(api.Pdate).format('DD/MM/YYYY')}`}</p>
          <p id="PostSummary">{api.PSummary}</p>
        
        </Link>
        )}
      </div>
    );
  };
}
