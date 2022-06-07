import React, { useRef, useState } from "react";
import styled from "styled-components";
import Container from "./styled/Container";
import toCamelCase from "./helpers/toCamelCase";
import RecentlyViewedList from "./home/RecentlyViewedList";
import HomeList from "./home/HomeList";
import Arrow from "../assets/svgs/Arrow";
import HomeNavbar from "./home/HomeNavbar";
import FeaturedList from "./home/FeaturedList";

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
    min-height: 80vh;
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
  const tabContainerRef = useRef(null);
  const [currentTab, setCurrentTab] = useState("recentlyViewed");
  const tabOnClick = (e) => setCurrentTab(toCamelCase(e.target.textContent));
  const getActiveStatusClassName = (tabName) =>
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
        <HomeNavbar
          containerRef={tabContainerRef}
          getActiveStatusClassName={getActiveStatusClassName}
          onTabClick={tabOnClick}
        />
        {currentTab == "recentlyViewed" ? (
          <RecentlyViewedList />
        ) : currentTab == "featured" ? (
          <FeaturedList />
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
