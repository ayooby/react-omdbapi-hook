import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Detail from "./components/Detail";
import Header from "./components/Header";
import Search from "./components/Search";
import Home from "./components/Home";
import MyMovies from "./components/MyMovies";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/detail/:id" component={Detail} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/my-movies" component={MyMovies} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
