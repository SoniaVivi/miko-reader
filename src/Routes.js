import { BrowserRouter, Switch, Route } from "react-router-dom";
import React from "react";
import App from "./App";
import Chapter from "./Chapter.js";
import Manga from "./Manga";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={App} />
        <Route path="/chapter" component={Chapter} />
        <Route path="/manga" component={Manga} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
