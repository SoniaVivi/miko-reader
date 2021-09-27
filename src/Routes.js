import { BrowserRouter, Switch, Route } from "react-router-dom";
import React from "react";
import Home from "./components/Home";
import Chapter from "./components/Chapter";
import Manga from "./components/Manga";
import Navbar from "./components//Navbar";

const Routes = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Navbar test={true} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/:manga/:chapter/:page" component={Chapter} />
          <Route exact path="/:manga" component={Manga} />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default Routes;
