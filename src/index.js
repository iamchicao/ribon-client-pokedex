import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Create from "./components/create/Create";
import Details from "./components/details/Details";
import Update from "./components/update/Update";

ReactDOM.render(
  <BrowserRouter>
    <div className="App">
      <App />
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
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
