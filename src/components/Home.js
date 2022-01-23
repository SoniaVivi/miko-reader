import React from "react";
import MangaPreview from "./MangaPreview";
import { useSelector } from "react-redux";
import {
  useGetPlanningListQuery,
  useGetReadingListQuery,
} from "../aniListSlice";
import AniListMangaPreview from "./aniList/AniListMangaPreview";
import styled from "styled-components";
import Container from "./styled/Container";
import Divider from "./styled/Divider";

const HomeContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  min-height: fit-content;
  padding: 20px 5px;

  h3 {
    margin-bottom: 25px;
    color: ${(props) => props.theme.textColor};
  }
`;

const MangaShowcase = styled.ul`
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
`;

const HomeDivider = styled(Divider)`
  margin-bottom: 25px;
`;

const Footer = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  max-width: 100vw;
  width: 100%;
  height: 32px;

  > div {
    padding: 5px 10px;
    opacity: 0.6;
    color: ${(props) => props.theme.textColor};
  }
`;

const Home = () => {
  const recentlyViewed = useSelector((state) => state.manga.recentlyViewed);
  const { userId, accessToken } = useSelector((state) => ({
    userId: state.user.id,
    accessToken: state.user.accessTokenData.accessToken,
  }));

  const { data: currentlyReading, isSuccess: isReadListSuccessful } =
    useGetReadingListQuery(
      { accessToken, userId },
      {
        skip: !userId || !accessToken,
      }
    );

  const { data: planningList, isSuccess: isPlanningListSuccessful } =
    useGetPlanningListQuery(
      { accessToken, userId },
      {
        skip: !userId || !accessToken,
      }
    );

  const showDivider = (...args) =>
    args.includes(true) ? (
      <HomeDivider dividerType="horizontal"></HomeDivider>
    ) : null;

  return (
    <React.Fragment>
      <HomeContainer>
        {recentlyViewed.length ? (
          <React.Fragment>
            <section className="recently-viewed">
              <h3>Recently Viewed</h3>
              <MangaShowcase>
                {recentlyViewed.map((id, i) => (
                  <MangaPreview id={id} key={i} query={recentlyViewed} />
                ))}
              </MangaShowcase>
            </section>
            {showDivider(isReadListSuccessful, isPlanningListSuccessful)}
          </React.Fragment>
        ) : (
          ""
        )}
        {isReadListSuccessful && currentlyReading.length ? (
          <React.Fragment>
            <section>
              <h3>Currently Reading</h3>
              <MangaShowcase>
                {currentlyReading.map((title, i) => (
                  <AniListMangaPreview title={title} key={i} />
                ))}
              </MangaShowcase>
            </section>
            {showDivider(isPlanningListSuccessful)}
          </React.Fragment>
        ) : (
          ""
        )}
        {isPlanningListSuccessful && planningList.length ? (
          <section>
            <h3>Planning to Read</h3>
            <MangaShowcase>
              {planningList.map((title, i) => (
                <AniListMangaPreview title={title} key={i} />
              ))}
            </MangaShowcase>
          </section>
        ) : (
          ""
        )}
      </HomeContainer>
      <Footer>
        <Container>Powered by Mangadex and AniList APIs</Container>
      </Footer>
    </React.Fragment>
  );
};

export default Home;
