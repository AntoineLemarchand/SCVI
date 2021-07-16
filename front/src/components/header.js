import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

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
  cursor: "pointer",
  textDecoration: "none"
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
    role: '',
  }

  Connect = (e) => {
    e.preventDefault();
  }

  Disconnect = (e) => {
    e.preventDefault();
    document.cookie = "userData=;path='/';expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    setTimeout(document.location.reload(), 500);
  }

  componentDidMount() {
    if (document.cookie !== '') {
      const cookie = JSON.parse(decodeURIComponent(document.cookie).slice(9));
      this.setState({
        username: cookie.username,
        role: cookie.role,
        userlogo: 'sign-out-alt',
      });
    } else {
      this.setState({
        username: 'Anonyme',
        userlogo: 'sign-in-alt',
      })
    }
    this.forceUpdate()
  }

  userButton = () => {
    if (document.cookie !== '') {

      return <button onClick={this.Disconnect} style={selectStyle}>
          <p style={ userTextStyle }>{ this.state.username }</p>
          <FontAwesomeIcon icon={["fas",this.state.userlogo]} id="user"/>
        </button>
    } else {
      return <NavLink to="/connexion" style={selectStyle}>
          <p style={ userTextStyle }>{ this.state.username }</p>
          <FontAwesomeIcon icon={["fas",this.state.userlogo]} id="user"/>
        </NavLink>
    }
  }

  render() {
    return (
      <div id="Header" style={headerStyle}>
        <div id="headerLeft" style={headerLeft}>
          <NavLink to="/" id="logo" style={selectStyle}>
            <FontAwesomeIcon icon={["fas","american-sign-language-interpreting"]}/>
          </NavLink>
          {
            (this.state.role === 'writer') ? (
              <NavLink to="/poster" id="logo" style={selectStyle}>
                <FontAwesomeIcon icon={["fas","edit"]}/>
              </NavLink>
            ) : ('')
          }
        </div>
        {this.userButton()}
      </div>
    )
  }
}
