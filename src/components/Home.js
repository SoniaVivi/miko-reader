import React from "react";
import MangaPreview from "./MangaPreview";
import { useGetMangasQuery } from "../apiSlice";

const Home = () => {
  const {
    data: mangaData,
    isLoading,
    isSuccess,
  } = useGetMangasQuery(["6670ee28-f26d-4b61-b49c-d71149cd5a6e"]);

  let content;

  if (isLoading) {
    content = [];
  } else if (isSuccess) {
    content = mangaData.ids.map((id, i) => <MangaPreview id={id} key={i} />);
  }

  return (
    <div className="container">
      <section>
        <h3>Recently Updated From Your List</h3>
        <ul className="showcase manga">{content}</ul>
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
