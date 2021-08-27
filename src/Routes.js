import { BrowserRouter, Switch, Route } from "react-router-dom";
import React from "react";
import Home from "./Home";
import Chapter from "./Chapter.js";
import Manga from "./Manga";

const Routes = () => {
  return (
    <React.Fragment>
      <nav>
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <input></input>
          </li>
          <li>
            <div>Profile</div>
          </li>
        </ul>
      </nav>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/:manga/:chapter" component={Chapter} />
          <Route exact path="/:manga" component={Manga} />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default Routes;
