import React from "react";
import MangaPreview from "./MangaPreview";
import { useSelector } from "react-redux";

const Home = () => {
  const recentlyViewed = useSelector((state) => state.manga.recentlyViewed);

  return (
    <div className="container home">
      {recentlyViewed.length ? (
        <section className="recently-viewed">
          <h3>Recently Updated From Your List</h3>
          <ul className="showcase manga">
            {recentlyViewed.map((id, i) => (
              <MangaPreview id={id} key={i} query={recentlyViewed} />
            ))}
          </ul>
        </section>
      ) : (
        ""
      )}
      {/* <li>
          <h3>Currently Reading</h3>
        </li>
        <li>
          <h3>Most Popular</h3>
        </li> */}
    </div>
  );
};

export default Home;
