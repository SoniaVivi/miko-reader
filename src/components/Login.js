import React, { useEffect } from "react";
import queryString from "query-string";
import { setAccessTokenData } from "../userSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (location.hash && queryString.parse(location.hash).access_token) {
      const {
        access_token: accessToken,
        expires_in: expiresIn,
        token_type: tokenType,
      } = queryString.parse(location.hash);

      dispatch(
        setAccessTokenData({
          accessToken,
          expiration: new Date(Date.now() + Number(expiresIn)).toLocaleString(),
          tokenType,
        })
      );
      history.push("/");
    }
  }, [dispatch, history]);
  return (
    <div className="container-sm main-background login">
      <a
        className="login anilist hover"
        //eslint-disable-next-line no-undef
        href={`https://anilist.co/api/v2/oauth/authorize?client_id=${process.env.REACT_APP_ANILIST_CLIENT_ID}&response_type=token`}
      >
        Login with AniList
      </a>
    </div>
  );
};

export default Login;
