const getCoverUrl = (mangaData) => {
  if (
    mangaData.relationships &&
    mangaData.relationships.length >= 3 &&
    mangaData.relationships[2].attributes
  ) {
    return `https://uploads.mangadex.org/covers/${mangaData.id}/${mangaData.relationships[2].attributes.fileName}.512.jpg`;
  }
  return "";
};
export default getCoverUrl;
