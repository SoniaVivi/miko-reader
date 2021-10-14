import { BrowserRouter, Switch, Route } from "react-router-dom";
import React, { useEffect } from "react";
import Home from "./components/Home";
import Chapter from "./components/Chapter";
import Manga from "./components/Manga";
import Navbar from "./components//Navbar";
import Login from "./components/Login";
import { useDispatch, useSelector } from "react-redux";
import { setUserData, tokenSelector } from "./userSlice";
import { useGetCurrentUserQuery } from "./aniListSlice";

const Routes = () => {
  const { accessToken } = useSelector(tokenSelector);
  const dispatch = useDispatch();
  const { name, id } = useGetCurrentUserQuery(accessToken, {
    selectFromResult: ({ data }) => ({
      id: data?.data?.Viewer?.id,
      name: data?.data?.Viewer?.name,
    }),
    skip: !accessToken,
  });

  useEffect(() => {
    if (name && id) {
      dispatch(setUserData(name, id));
    }
  }, [dispatch, name, id]);

  return (
    <React.Fragment>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/:manga/:chapter/:page" component={Chapter} />
          <Route exact path="/:manga" component={Manga} />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default Routes;
