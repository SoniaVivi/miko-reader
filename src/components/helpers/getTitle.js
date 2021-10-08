const getTitle = (mangaData) =>
  mangaData.attributes.title[Object.keys(mangaData.attributes.title)[0]];

export default getTitle;
