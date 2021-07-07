import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const containerStyle = {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  height: '90vh'
}

const formStyle = {
  width: '50vw',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  marginTop: '20vh',
  backgroundColor: '#1d2021',
  padding: '30px',
  borderRadius: '20px',
  boxShadow: '5px 5px 10px black',
}

const textInputStyle = {
  marginTop: '2vh',
  paddingLeft: '15px',
  height: '4vh',
  fontSize: '2vh',
  border: 'none',
  borderRadius: '15px',
  backgroundColor: '#504945',
  color: '#ebdbb2'
}

const buttonStyle = {
  width: '20vw',
  height: '5vh',
  margin: '2vh 0 0 auto',
  border: 'none',
  borderRadius: '15px',
  backgroundColor: '#fe8019',
  color: '#1d2021',
  boxShadow: '2.5px 2.5px 5px',
  cursor: 'pointer'
}

const linkStyle = {
  textDecoration: 'none',
  color: '#ebdbb2',
  margin: '2vh .2vw 0 auto'
}

export default class register extends Component {

  state = {
    username: '',
    password: '',
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const url = "http://localhost:9000/connexion"
    var data = {
      username: this.state.username,
      password: this.state.password,
    }
    axios.post(url, data)
      .then(res => {
        if (typeof res.data.userID !== 'undefined') {
          localStorage.setItem('userId', res.data.userID);
          localStorage.setItem('username', res.data.username);
          localStorage.setItem('loggedin', res.data.loggedin);
          window.location.href = "/"
        } else {
          alert("Pseudonyme et/ou mot de passe éronné")
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    return(
      <div id="registerForm" style={containerStyle}>
        <form onSubmit={this.handleSubmit} style={formStyle}>
          <input 
            type="text" 
            name="username" 
            onChange={this.onChange} 
            placeholder="Pseudonyme"
            style={textInputStyle}
          />
          <input 
            type="password" 
            name="password"   
            onChange={this.onChange} 
            placeholder="Mot de passe"
            style={textInputStyle}
          />
          <button type="submit" style={ buttonStyle }>Connexion</button>
          <Link to="/inscription" style={ linkStyle }>Créer un compte</Link>
        </form>
      </div>
    )
  }
}
