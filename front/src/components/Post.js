import React, {Component} from "react";
import axios from "axios";
import Moment from "moment";
import ReactMarkdown from "react-markdown";
import CommentBox from "./Comment.js";

const PostStyle = {
  height: "80vh",
  padding: "5vh 15vw 5vh 15vw",
  overflowY: "scroll",
  color: "#ebdbb2"
}

const CommentStyle = {
  backgroundColor: "#1d2021",
  boxShadow: "5px 5px 10px black",
  padding: "2vh",
  margin: "2vh 0 2vh 0",
  borderRadius: "15px",
}

export default class Post extends Component {
  state = {
    Comments: [],
    Post: {},
    PostID: this.props.match.params.id,
  }

  componentDidMount() {
    axios.post('http://localhost:9000/post', {PostID: this.state.PostID})
      .then(res => {
        this.setState({ Post: res.data[0] })
      })
    axios.post('http://localhost:9000/comments', { PostID: this.state.PostID })
      .then(res => {
        this.setState({ Comments: res.data })
      })
      .catch(err => console.log(err)) 
  }

  render() {
    return(
      <div id="Post" style={PostStyle}>
        <h1>{this.state.Post.Title}</h1>
        <h2>Par {this.state.Post.Writer} le {Moment(this.state.Post.Date).format('DD/MM/YYYY')}</h2>
        <ReactMarkdown>{this.state.Post.Body}</ReactMarkdown>
        <div id="Comments">
          <h2>Commentaires </h2>
          {this.state.Comments.length === 0 ? <p>Pas de commentaire pour le moment... Ecrivez en un !</p> : ''}
          <CommentBox post={this.state.PostID}/>
          {
            this.state.Comments.map ((comment, index) => 
            {
                return (
                  <div key={index} id="Comment" style={CommentStyle}>
                    <h4>{ `${comment.name} Le ${Moment(comment.Date).format('DD/MM/YYYY')} à ${Moment(comment.Date).format('HH:mm')}`}</h4>
                    <p>{`${comment.Body}`}</p>
                  </div>
                )
              }
          )
        }
        </div>
      </div>
    )}
}
