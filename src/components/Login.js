import React, { useEffect } from "react";
import queryString from "query-string";
import { setAccessTokenData } from "../userSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import { center } from "./styled/mixins";

const Container = styled.div`
  flex-direction: column;
  align-items: center;
  max-height: 100%;
  height: calc(100vh - ${(props) => props.theme.navbarHeight} - 40px);
  margin: 20px auto;
  padding-top: 32px;
  background-color: ${(props) => props.theme.mainBackground};
`;

const LoginLink = styled.a`
  ${center}
  max-width: 100%;
  width: 150px;
  height: 32px;
  font-weight: 600;
  border: 1px solid ${(props) => props.theme.lightBorder};
  color: ${(props) => props.theme.textColor};
`;

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
    <Container className="container-sm">
      <LoginLink
        className="login anilist hover"
        //eslint-disable-next-line no-undef
        href={`https://anilist.co/api/v2/oauth/authorize?client_id=${process.env.REACT_APP_ANILIST_CLIENT_ID}&response_type=token`}
      >
        Login with AniList
      </LoginLink>
    </Container>
  );
};

export default Login;
