//REACT
import React from "react";
import PropTypes from "prop-types";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//PAGES
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

App.propTypes = {
  history: PropTypes.object,
};

export default App;
