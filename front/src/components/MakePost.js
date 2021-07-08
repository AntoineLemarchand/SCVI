import React, {Component} from 'react';
import axios from 'axios';

const containerStyle = {
  height: '90vh',
  width: '100vw',
  overflowY: 'scroll',
}

const formStyle = {
  margin: '5vh auto 5vh auto',
  padding: '5vh',
  borderRadius: '20px',
  display: 'flex',
  flexDirection: 'column',
  width: '70vw',
  backgroundColor: '#1d2021',
  boxShadow: '5px 5px 10px black',
}

const titleInputStyle = {
  border: 'none',
  borderRadius: '10px',
  backgroundColor: '#504945',
  color: '#ebdbb2',
  height: '4vh',
  fontSize: '3vh',
  padding: '1vw',
}

const textInputStyle = {
  marginTop: '5vh',
  border: 'none',
  borderRadius: '10px',
  backgroundColor: '#504945',
  color: '#ebdbb2',
  fontSize: '2vh',
  padding: '1vw',
}

const buttonStyle = {
  margin: '3vh 0 5vh auto',
  border: 'none',
  borderRadius: '10px',
  minWidth: '20vw',
  minHeight: '4vh',
  fontSize: '2vh',
  backgroundColor: '#fe8019',
  color: '#1d2021',
}

export default class MakePost extends Component {
  
  state = {
    userId: localStorage.getItem('userId'),
    poster: '',
    title: '',
    summary: '',
    body: '',
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  MakePost = (e) => {
    e.preventDefault();
    const data = {
      poster: this.state.userId,
      title: this.state.title,
      body: this.state.body,      
      summary: this.state.summary,
    };
    var url = "http://localhost:9000/makePost";
    axios.post(url, data)
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div id="makePost" style={containerStyle}>
        <form onSubmit={this.MakePost} style={formStyle}>
          <input 
            type="text" 
            name="title" 
            placeholder="Titre du Poste" 
            onChange={this.onChange}
            style={titleInputStyle}
          />
          <textarea 
            name="summary" 
            rows="10"
            placeholder="Résumé (pour la preview du post)" 
            onChange={this.onChange}
            style={textInputStyle}
          />
          <textarea 
            name="body" 
            rows="30"
            placeholder="Post (Markdown possible)" 
            onChange={this.onChange}
            style={textInputStyle}
          />
          <button type="submit" style={buttonStyle}>Poster</button>
        </form>
      </div>
    )
  }
}
