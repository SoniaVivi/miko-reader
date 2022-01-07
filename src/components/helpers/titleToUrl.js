const titleToUrl = (title) =>
  `/${title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")}`;

export default titleToUrl;
