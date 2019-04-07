import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import Dashboard from "./components/dashboard/Dashboard";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/pokemon/:id" component={Details} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
