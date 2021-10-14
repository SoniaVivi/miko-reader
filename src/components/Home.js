import React from "react";
import MangaPreview from "./MangaPreview";
import { useSelector } from "react-redux";
import { useGetReadingListQuery } from "../aniListSlice";
import AniListMangaPreview from "./AniListMangaPreview";

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

  return (
    <div className="container home">
      {recentlyViewed.length ? (
        <section className="recently-viewed">
          <h3>Recently Viewed</h3>
          <ul className="showcase manga">
            {recentlyViewed.map((id, i) => (
              <MangaPreview id={id} key={i} query={recentlyViewed} />
            ))}
          </ul>
        </section>
      ) : (
        ""
      )}
      {isReadListSuccessful && currentlyReading.length ? (
        <section>
          <h3>Currently Reading</h3>
          <ul className="showcase manga">
            {currentlyReading.map((title, i) => (
              <AniListMangaPreview title={title} key={i} />
            ))}
          </ul>
        </section>
      ) : (
        ""
      )}
    </div>
  );
};

export default Home;
