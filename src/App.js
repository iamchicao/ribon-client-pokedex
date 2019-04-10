import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Create from "./components/create/Create";
import Details from "./components/details/Details";
import Update from "./components/update/Update";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route
                exact
                path="/pokemon/details/:id"
                component={withRouter(Details)}
              />
              <Route exact path="/pokemon/edit/:id" component={Update} />
              <Route exact path="/pokemon/new" component={Create} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
