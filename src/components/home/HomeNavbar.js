import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Divider from "../styled/Divider";
import HoverButton from "../styled/HoverButton";
import { useSelector } from "react-redux";
import { isLoggedIn } from "../../userSlice";

const HomeDivider = styled(Divider)`
  flex-grow: 1;
  align-self: flex-end;
  min-width: unset;
  background-color: ${(props) => props.theme.darkBorder};
`;

const MangaListsContainer = styled.ul`
  display: flex;
  height: 35px;
  margin-bottom: 20px;
  border: 1px solid ${(props) => props.theme.darkBorder};
  border-bottom-left-radius: unset;
  border-bottom-right-radius: unset;
  border-bottom: unset;
`;

const MangaListsTab = styled(HoverButton)`
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-end;
  width: fit-content;
  padding: 5px 20px;
  border-radius: unset;
  border-bottom: 1px solid ${(props) => props.theme.darkBorder};
  font-size: 17px;
  font-weight: 600;

  &.active {
    padding-bottom: 6px;
    border-bottom: unset;
    background-color: ${(props) => props.theme.mainBackground};
  }
`;

const HomeNavbar = (props) => {
  const loggedIn = useSelector(isLoggedIn);

  return (
    <MangaListsContainer ref={props.containerRef}>
      <MangaListsTab
        as="li"
        onClick={props.onTabClick}
        className={props.getActiveStatusClassName("recentlyViewed")}
      >
        Recently Viewed
      </MangaListsTab>
      <Divider dividerType="vertical" />
      <MangaListsTab
        as="li"
        onClick={props.onTabClick}
        className={props.getActiveStatusClassName("featured")}
      >
        Featured
      </MangaListsTab>
      {loggedIn ? (
        <React.Fragment>
          <MangaListsTab
            as="li"
            onClick={props.onTabClick}
            className={props.getActiveStatusClassName("reading")}
          >
            Reading
          </MangaListsTab>
          <Divider dividerType="vertical" />
          <MangaListsTab
            as="li"
            onClick={props.onTabClick}
            className={props.getActiveStatusClassName("planning")}
          >
            Planning
          </MangaListsTab>
          <Divider dividerType="vertical" />
          <MangaListsTab
            as="li"
            onClick={props.onTabClick}
            className={props.getActiveStatusClassName("completed")}
          >
            Completed
          </MangaListsTab>
          <Divider dividerType="vertical" />
          <MangaListsTab
            as="li"
            onClick={props.onTabClick}
            className={props.getActiveStatusClassName("dropped")}
          >
            Dropped
          </MangaListsTab>
          <MangaListsTab
            as="li"
            onClick={props.onTabClick}
            className={props.getActiveStatusClassName("paused")}
          >
            Paused
          </MangaListsTab>
          <Divider dividerType="vertical" />
        </React.Fragment>
      ) : null}
      <HomeDivider dividerType="horizontal" />
    </MangaListsContainer>
  );
};

export default HomeNavbar;

HomeNavbar.propTypes = {
  containerRef: PropTypes.object.isRequired,
  getActiveStatusClassName: PropTypes.func.isRequired,
  onTabClick: PropTypes.func.isRequired,
};
