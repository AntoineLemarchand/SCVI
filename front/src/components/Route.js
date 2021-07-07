import React, {Component} from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ShowPosts from "./showPosts"
import NotFound from "./NotFound";
import Post from "./Post";
import Login from "./login";
import Register from "./Registration";

export default class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ ShowPosts }/>
          <Route path="/Post/:id" component={ Post }/>
          <Route path="/connexion" component={ Login }/>
          <Route path="/inscription" component= { Register }/>
          <Route component={ NotFound }/>
        </Switch>
      </BrowserRouter>
    )
  }
}
