import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas)

const headerStyle = {
  width: "100vw",
  height: "10vh",
  backgroundColor: "#1d2021",  
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between"
}

const selectStyle = {
  color: "#b8bb26",
  fontSize: "4vh",
  margin: "0 4vh 0 4vh",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#1d2021",
  border: "none",
  cursor: "pointer"
}

const searchboxStyle = {
  text: {
    border: "none",
    borderRadius: "10px 0 0 10px",
    height: "2.45vh",
    width: "30vw",
    padding: "1vh",
    backgroundColor: "#504945",
    color: "#ebebb2"
  },
  button: {
    border: "none",
    borderRadius: " 0 10px 10px 0",
    height: "4.4vh",
    backgroundColor: "#b8bb26"

  }
}

const userTextStyle = {
  color: "#b8bb26",
  fontSize: "2vh",
  marginRight: "2vw",
}


export default class Header extends Component {
  state = {
    username: '',
    userlogo: '',
    action: '',
  }

  Connect = (e) => {
    e.preventDefault();
    window.location.href = '/connexion'
  }

  Disconnect = (e) => {
    e.preventDefault();
    localStorage.removeItem("loggedin");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    window.location.reload();
  }

  componentDidMount() {
    if (localStorage.getItem('loggedin')) {
      this.setState({
        username: localStorage.getItem('username'),
        userlogo: 'sign-out-alt',
        action: this.Disconnect
      });
    } else {
      this.setState({
        username: 'Anonyme',
        userlogo: 'sign-in-alt',
        action: this.Connect
      })
    }
  }

  render() {
    return (
      <div id="Header" style={headerStyle}>
        <a href="/" id="logo" style={selectStyle}>
          <FontAwesomeIcon icon={["fas","american-sign-language-interpreting"]}/>
        </a>
        <div id="searchbox">
          <input type="text" style={searchboxStyle.text}/>
          <button className="searchButton" onClick={this.SearchQuery} style={searchboxStyle.button} > <FontAwesomeIcon icon={["fas","search"]}/> </button>
        </div>
        <button onClick={this.state.action} id='user' style={selectStyle}>
          <p style={ userTextStyle }>{ this.state.username }</p>
          <FontAwesomeIcon icon={["fas",this.state.userlogo]} id="user"/>
        </button>
      </div>
    )
  }
}
