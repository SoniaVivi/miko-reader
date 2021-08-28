import React from "react";
import MangaPreview from "./MangaPreview";

const Home = () => {
  return (
    <div className="container">
      <section>
        <h3>Recently Updated From Your List</h3>
        <ul className="showcase manga">
          {Array.apply(null, Array(12)).map((_, i) => (
            <MangaPreview
              id={"Test"}
              name={"Lorem ipsum dolor sit amet, insolens maiestatis pri eu"}
              cover={"coverUrl"}
              publicationStatus={"Testing"}
              synopsis={`Lorem ipsum dolor sit amet, at ius quas dicunt tamquam,
                mea altera vivendo persecuti eu. Legimus dissentiet accommodare
                nec at, primis aeterno fastidii usu eu`}
              author={"Nullpo Gah"}
              artist={"Nullpo Gah"}
              //eslint-disable-next-line no-unused-vars
              chapters={Array.apply(null, Array(120)).map((_, i) => {
                return {
                  uploader: "Lorem ipsum dolor",
                  group: "Lorem ipsum dolor sit amet",
                  title: `Lorem Ipsum${i}`,
                  uploaded: "2013-09-04T05:24:55",
                  id: "-1",
                };
              })}
              key={i}
            />
          ))}
        </ul>
      </section>
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
