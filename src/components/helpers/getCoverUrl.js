const getCoverUrl = (mangaData) =>
  `https://uploads.mangadex.org/covers/${mangaData.id}/${mangaData.relationships[2].attributes.fileName}.512.jpg`;
export default getCoverUrl;
