import React from "react";
import MangaPreview from "./MangaPreview";
import MangaShowcase from "./MangaShowcase";

const FeaturedList = () => {
  const mangas = [
    "6670ee28-f26d-4b61-b49c-d71149cd5a6e",
    "26e40241-4a4e-4d12-a04d-cb3f7f707100",
    "cb5d6a21-50c2-4e17-a169-018be817f97e",
    "107be290-6a4b-4974-a9c5-3761a2514823",
    "0c697908-bafd-44ec-ae29-b8515becd506",
    "75ee72ab-c6bf-4b87-badd-de839156934c",
    "a8aabcc9-0531-4f32-b202-1589fbc5fde3",
    "0861e776-968f-4549-847b-7e33c6d6555e",
  ];
  return (
    <MangaShowcase>
      {mangas.map((mangaId) => (
        <MangaPreview key={mangaId} id={mangaId} query={mangas} />
      ))}
    </MangaShowcase>
  );
};

export default FeaturedList;
