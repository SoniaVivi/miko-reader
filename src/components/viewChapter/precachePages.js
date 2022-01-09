const precachePages = async (current, total, urlFunc) => {
  const startAt = current > 1 ? 1 : 0;
  const images = [];
  const loadImage = (url) =>
    new Promise((resolve) => {
      const newImg = new Image();
      newImg.src = url;
      newImg.addEventListener("load", () => {
        setTimeout(() => resolve(newImg), 250);
      });
    });

  const iterateImages = async (start, endAt) => {
    const change = start < endAt ? 1 : -1;
    for (let i = start; i != endAt; i += change) {
      const url = urlFunc(i);
      const image = await loadImage(url);
      images.push(image);
    }
  };
  await iterateImages(startAt, total);
  if (current > 2) {
    await iterateImages(current - 2, 0);
  }
};

export default precachePages;
