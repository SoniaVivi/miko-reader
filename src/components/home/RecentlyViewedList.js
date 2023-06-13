import React from "react";
import { useSelector } from "react-redux";
import MangaShowcase from "./MangaShowcase";
import MangaPreview from "./MangaPreview.js";

const RecentlyViewedList = () => {
  const recentlyViewed = useSelector((state) => state.manga.recentlyViewed);

  return (
    <section>
      <MangaShowcase>
        {recentlyViewed.map((id, i) => (
          <MangaPreview id={id} key={id} query={recentlyViewed} delay={i + 3} />
        ))}
      </MangaShowcase>
    </section>
  );
};

export default RecentlyViewedList;
