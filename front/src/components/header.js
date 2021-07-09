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

const headerLeft = {
  display: 'flex',
  flexDirection: 'row',
}

const selectStyle = {
  color: "#b8bb26",
  fontSize: "4vh",
  margin: "0 2vh 0 2vh",
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
    width: "20vw",
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
    role: '',
  }

  Connect = (e) => {
    e.preventDefault();
    window.location.href = '/connexion'
  }

  Disconnect = (e) => {
    e.preventDefault();
    document.cookie = "userData=;path='/';expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    document.location.reload();
  }

  componentDidMount() {
    if (document.cookie !== '') {
      const cookie = JSON.parse(decodeURIComponent(document.cookie).slice(11))
      this.setState({
        username: cookie.username,
        role: cookie.role,
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
        <div id="headerLeft" style={headerLeft}>
          <a href="/" id="logo" style={selectStyle}>
            <FontAwesomeIcon icon={["fas","american-sign-language-interpreting"]}/>
          </a>
          {
            (this.state.role === 'writer') ? (
              <a href="/poster" id="logo" style={selectStyle}>
                <FontAwesomeIcon icon={["fas","edit"]}/>
              </a>
            ) : ('')
          }
        </div>
        <div id="searchbox">
          <input 
            type="text" 
            style={searchboxStyle.text} 
            placeholder="Rechercher"
          />
          <button 
            className="searchButton" 
            onClick={this.SearchQuery} 
            style={searchboxStyle.button} > <FontAwesomeIcon 
            icon={["fas","search"]}
          /> </button>
        </div>
        <button 
          onClick={this.state.action} 
          id='user' style={selectStyle}
        >
          <p style={ userTextStyle }>{ this.state.username }</p>
          <FontAwesomeIcon icon={["fas",this.state.userlogo]} id="user"/>
        </button>
      </div>
    )
  }
}
