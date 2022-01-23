import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import SearchBar from "./searchBar/SearchBar";
import Profile from "./navbar/Profile";
import styled from "styled-components";

const StyledNav = styled.nav`
  position: sticky;
  z-index: ${(props) => props.theme.thirdLevelZIndex};
  top: 0;
  display: flex;
  justify-content: center;
  max-width: 100%;
  min-width: 100%;
  max-height: ${(props) => props.theme.navbarHeight};
  background-color: ${(props) => props.theme.mainBackground};
  transition: all ${(props) => props.theme.navTransitionTiming};

  &.hide {
    position: relative;
    margin-top: -48px;
  }
`;

const NavList = styled.ul`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  padding: 8px 20px;
  border-bottom: 1px solid ${(props) => props.theme.lightBorder};
  border-radius: 0;
  border-right: 0;
`;

const HomeButton = styled.button`
  margin-right: 8px;
  margin-right: auto;
  font-family: "Lato Black";

  a {
    color: ${(props) => props.theme.home};
  }
`;

const Navbar = () => {
  const history = useHistory();
  const showNav = useSelector((state) => state.settings.showNav);

  return (
    <StyledNav className={showNav ? null : " hide"}>
      <NavList>
        <HomeButton>
          <a onClick={() => history.replace("/")}>Home</a>
        </HomeButton>
        <SearchBar />
        <Profile />
      </NavList>
    </StyledNav>
  );
};

export default Navbar;
