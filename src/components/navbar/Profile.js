import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import testProfilePicture from "../../assets/testProfilePicture.png";
import { toggleTheme } from "../../settingsSlice";
import { isLoggedIn, logoutFromAniList } from "../../userSlice";
import onOutsideClick from "../helpers/onOutsideClick";
import styled from "styled-components";
import { circle } from "../styled/mixins";
import HoverButton from "../styled/HoverButton";
import HoverLink from "../styled/HoverLink";
import ColoredSpan from "../styled/ColoredSpan";

const ProfileContainer = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 145px;
  width: fit-content;
  padding-left: 5px;
  border: 1px solid ${(props) => props.theme.mainBackground};

  &:hover,
  &.active {
    border-color: ${(props) => props.theme.extraLightBorder};
    max-height: fit-content;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

const UserWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 8px;
`;

const ProfileIcon = styled.img`
  ${circle("32px")}
  margin-right: 5px;
  border: 1px solid $main-background;
`;

const ProfileMenu = styled.div`
  position: absolute;
  top: 100%;
  left: -1px;
  z-index: ${(props) => props.theme.secondLevelZIndex};
  display: flex;
  flex-direction: column;
  width: calc(100% + 2px);
  padding: 5px;
  border: 1px solid ${(props) => props.theme.extraLightBorder};
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-top: unset;
  background-color: ${(props) => props.theme.mainBackground};

  > * {
    display: flex;
    margin-left: 32px;
    padding-left: 5px;
    padding-bottom: 5px;
    font-weight: 600;
  }

  > *:not(:first-child) {
    margin-top: 3px;
  }
`;

const Profile = () => {
  const {
    name: userName,
    avatar,
    theme,
  } = useSelector((state) => ({
    name: state.user.name,
    avatar: state.user.avatar,
    theme: state.settings.theme.name,
  }));
  const [isExpanded, setIsExpanded] = useState(false);
  const loggedIn = useSelector(isLoggedIn);
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <ProfileContainer
      className={isExpanded ? "active" : null}
      onClick={(e) => {
        setIsExpanded((prevState) => !prevState);
        onOutsideClick(
          e.target.parentNode.parentNode,
          () => setIsExpanded(false),
          {
            custom: true,
          }
        );
      }}
    >
      <UserWrapper className={isExpanded ? "active" : null}>
        <ProfileIcon
          src={avatar.length ? avatar : testProfilePicture}
          width="75"
          height="75"
        ></ProfileIcon>
        <ColoredSpan>{userName ? userName : "Nullpo"}</ColoredSpan>
      </UserWrapper>
      {isExpanded ? (
        <ProfileMenu>
          <HoverButton onClick={() => dispatch(toggleTheme())}>
            {theme == "light" ? "Dark Mode" : "Light Mode"}
          </HoverButton>
          {loggedIn ? (
            <HoverButton onClick={() => dispatch(logoutFromAniList())}>
              Logout
            </HoverButton>
          ) : (
            <HoverLink className="hover" onClick={() => history.push("/login")}>
              Login
            </HoverLink>
          )}
        </ProfileMenu>
      ) : (
        ""
      )}
    </ProfileContainer>
  );
};

export default Profile;
