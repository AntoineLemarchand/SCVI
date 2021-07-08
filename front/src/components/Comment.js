import React, {Component} from 'react';
import axios from "axios";

const CommentStyle = {
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#1d2021",
  borderRadius: "15px",
  padding: "3vh",
  boxShadow: " 5px 5px 10px black"
}

const TextAreaStyle = {
  width: "100%",
  borderRadius: "7px",
  border: "none",
  margin: "2vh 0 3vh 0",
  backgroundColor: "#504945",
  color: "#ebdbb2",
  padding: "1vh",
  fontSize: "14px",
  resize: "none"
}

const ButtonStyle = {
  width: "15vw",
  height: "4vh",
  marginLeft: "auto",
  border: "none",
  borderRadius: "7px",
  backgroundColor: "#fe8019",
  color: "#1d2021",
  cursor: "pointer",
}

export default class CommentBox extends Component {
  state = {
    postId: this.props.post,
    userId: '',
    username: '',
    cbody: ''
  }

  updateArea = (e) => {
    e.preventDefault();
    this.setState({cbody: e.target.value})
  }

  componentDidMount() {
    if (localStorage.getItem('loggedin')) {
      this.setState({username: localStorage.getItem('username')})
      this.setState({userId: localStorage.getItem('userId')})
    } else {
      this.setState({username: "Anonyme"})
    }
  }


  onSubmit = (e) => {
    e.preventDefault();
    const commenter = this.state.userId;
    const post = this.state.postId;
    const cbody = this.state.cbody;
    axios.post("http://localhost:9000/postComment", {commenter: commenter, post: post, cbody: cbody});
    window.location.reload();
  }

  render() {
    return (
      <form style={CommentStyle} onSubmit={this.onSubmit} >
        <label>{this.state.username}</label>
        <textarea onChange={this.updateArea} rows="4" placeholder="I think you are the worst writer in existence blah blah blah" style={TextAreaStyle}/>
        <button style={ButtonStyle} type='submit'>Comment</button>
      </form>
    )
  }
}
