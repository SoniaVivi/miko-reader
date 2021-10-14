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
    <div>
      <a
        href="https://anilist.co/api/v2/oauth/authorize?client_id=6715&response_type=token"
        target="_blank"
        rel="noreferrer"
      >
        Login with AniList
      </a>
    </div>
  );
};

export default Login;
