import React, {Component} from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import ShowPosts from "./showPosts"
import NotFound from "./NotFound";
import Post from "./Post";
import Login from "./login";
import Register from "./Registration";
import MakePost from "./MakePost";
import Header from "./header";

export default class Routes extends Component {
  render() {
    return (
      <HashRouter>
        <Header/>
        <Switch>
          <Route exact path="/" component={ ShowPosts }/>
          <Route path="/post/:id" component={ Post }/>
          <Route path="/poster" component={ MakePost }/>
          <Route path="/connexion" component={ Login }/>
          <Route path="/inscription" component= { Register }/>
          <Route component={ NotFound }/>
        </Switch>
      </HashRouter>
    )
  }
}
