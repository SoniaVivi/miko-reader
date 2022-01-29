const toCamelCase = (str) =>
  str.slice(0, 1).toLowerCase() +
  str
    .split(" ")
    .map((word) => word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase())
    .join("")
    .slice(1);

export default toCamelCase;
