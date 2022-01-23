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
import { ThemeProvider } from "styled-components";

const Routes = () => {
  const theme = useSelector((state) => state.settings.theme.style);
  const { accessToken } = useSelector(tokenSelector);
  const dispatch = useDispatch();
  const { name, id, avatar } = useGetCurrentUserQuery(accessToken, {
    selectFromResult: ({ data }) => ({
      id: data?.data?.Viewer?.id,
      name: data?.data?.Viewer?.name,
      avatar: data?.data?.Viewer?.avatar?.medium,
    }),
    skip: !accessToken,
  });

  useEffect(() => {
    if (name && id) {
      dispatch(setUserData(name, id, avatar));
    }
  }, [dispatch, name, id, avatar]);
  useEffect(() => {
    document.querySelector("body").style.backgroundColor = theme.bodyBackground;
  }, [theme]);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/:manga/:chapter/:page" component={Chapter} />
          <Route exact path="/:manga" component={Manga} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default Routes;
