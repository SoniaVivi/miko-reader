const getCoverUrl = (mangaData) => {
  if (
    mangaData.relationships &&
    mangaData.relationships.length >= 3 &&
    mangaData.relationships[2].attributes
  ) {
    //eslint-disable-next-line no-undef
    return `${process.env.REACT_APP_COVER_MANGADEX}${mangaData.id}/${mangaData.relationships[2].attributes.fileName}.512.jpg`;
  }
  return "";
};
export default getCoverUrl;
