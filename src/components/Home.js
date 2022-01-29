import React, { useRef, useState } from "react";
import styled from "styled-components";
import Container from "./styled/Container";
import HoverButton from "./styled/HoverButton";
import toCamelCase from "./helpers/toCamelCase";
import { useSelector } from "react-redux";
import { isLoggedIn } from "../userSlice";
import RecentlyViewedList from "./home/RecentlyViewedList";
import HomeList from "./home/HomeList";
import Divider from "./styled/Divider";
import Arrow from "../assets/svgs/Arrow";

const HomeContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - ${(props) => props.theme.navbarHeight});
  height: fit-content;
  padding: 20px 5px;

  h3 {
    margin-bottom: 25px;
    color: ${(props) => props.theme.textColor};
  }

  section {
    background-color: ${(props) => props.theme.mainBackground};
  }
`;

const Footer = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  max-width: 100vw;
  width: 100%;
  height: 32px;
  padding-top: 15px;

  > div {
    padding: 5px 10px;
    opacity: 0.6;
    color: ${(props) => props.theme.textColor};
  }
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

const HomeDivider = styled(Divider)`
  flex-grow: 1;
  align-self: flex-end;
  min-width: unset;
  background-color: ${(props) => props.theme.darkBorder};
`;

const GoToTopButton = styled.div`
  position: fixed;
  bottom: 25px;
  display: flex;
  justify-content: flex-end;
  max-width: 960px;
  width: 100%;
  padding-right: 50px;
  margin: 0 auto;
  pointer-events: none;

  > * {
    pointer-events: auto;

    &:not(:hover) {
      background-color: ${(props) => props.theme.mainBackground};
    }
  }
`;

const Home = () => {
  const loggedIn = useSelector(isLoggedIn);
  const tabContainerRef = useRef(null);
  const [currentTab, setCurrentTab] = useState("recentlyViewed");
  const tabOnClick = (e) => setCurrentTab(toCamelCase(e.target.textContent));
  const getClassName = (tabName) =>
    tabName == currentTab ? "active clickable" : "clickable";

  return (
    <React.Fragment>
      <HomeContainer>
        <GoToTopButton>
          <Arrow
            className="top"
            onClick={() => tabContainerRef.current.scrollIntoView(true)}
          />
        </GoToTopButton>
        <MangaListsContainer ref={tabContainerRef}>
          <MangaListsTab
            as="li"
            onClick={tabOnClick}
            className={getClassName("recentlyViewed")}
          >
            Recently Viewed
          </MangaListsTab>
          <Divider dividerType="vertical" />
          {loggedIn ? (
            <React.Fragment>
              <MangaListsTab
                as="li"
                onClick={tabOnClick}
                className={getClassName("reading")}
              >
                Reading
              </MangaListsTab>
              <Divider dividerType="vertical" />
              <MangaListsTab
                as="li"
                onClick={tabOnClick}
                className={getClassName("planning")}
              >
                Planning
              </MangaListsTab>
              <Divider dividerType="vertical" />
              <MangaListsTab
                as="li"
                onClick={tabOnClick}
                className={getClassName("completed")}
              >
                Completed
              </MangaListsTab>
              <Divider dividerType="vertical" />
              <MangaListsTab
                as="li"
                onClick={tabOnClick}
                className={getClassName("dropped")}
              >
                Dropped
              </MangaListsTab>
              <MangaListsTab
                as="li"
                onClick={tabOnClick}
                className={getClassName("paused")}
              >
                Paused
              </MangaListsTab>
              <Divider dividerType="vertical" />
            </React.Fragment>
          ) : null}
          <HomeDivider dividerType="horizontal" />
        </MangaListsContainer>
        {currentTab == "recentlyViewed" ? (
          <RecentlyViewedList />
        ) : (
          <HomeList
            listType={
              {
                reading: "current",
              }[currentTab] || currentTab
            }
          />
        )}
      </HomeContainer>
      <Footer>
        <Container>Powered by Mangadex and AniList APIs</Container>
      </Footer>
    </React.Fragment>
  );
};

export default Home;
