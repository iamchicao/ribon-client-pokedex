import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import Details from "./components/details/Details";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/pokemon/:id" component={Details} />
              <Route exact path="/pokemon/new" />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
