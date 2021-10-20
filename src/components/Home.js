import React from "react";
import MangaPreview from "./MangaPreview";
import { useSelector } from "react-redux";
import {
  useGetPlanningListQuery,
  useGetReadingListQuery,
} from "../aniListSlice";
import AniListMangaPreview from "./aniList/AniListMangaPreview";

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
    args.includes(true) ? <div className="divider home"></div> : null;

  return (
    <React.Fragment>
      <div className="container home">
        {recentlyViewed.length ? (
          <React.Fragment>
            <section className="recently-viewed">
              <h3>Recently Viewed</h3>
              <ul className="showcase manga">
                {recentlyViewed.map((id, i) => (
                  <MangaPreview id={id} key={i} query={recentlyViewed} />
                ))}
              </ul>
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
              <ul className="showcase manga">
                {currentlyReading.map((title, i) => (
                  <AniListMangaPreview title={title} key={i} />
                ))}
              </ul>
            </section>
            {showDivider(isPlanningListSuccessful)}
          </React.Fragment>
        ) : (
          ""
        )}
        {isPlanningListSuccessful && planningList.length ? (
          <section>
            <h3>Planning to Read</h3>
            <ul className="showcase manga">
              {planningList.map((title, i) => (
                <AniListMangaPreview title={title} key={i} />
              ))}
            </ul>
          </section>
        ) : (
          ""
        )}
      </div>
      <div className="footer">
        <div className="container">Powered by Mangadex and AniList APIs</div>
      </div>
    </React.Fragment>
  );
};

export default Home;
