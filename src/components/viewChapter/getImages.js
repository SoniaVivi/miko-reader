const getImages = (imageUrls) => {
  imageUrls = imageUrls.filter((url) => !!url);
  const images = imageUrls.map(
    (url) =>
      new Promise((resolve) => {
        const newImg = new Image();
        //eslint-disable-next-line no-undef
        newImg.src = process.env.REACT_APP_PAGE_BASE_URL + url;
        newImg.addEventListener("load", () => {
          resolve(newImg);
        });
      })
  );
  return Promise.all(images).then((fetchedImages) =>
    fetchedImages.map(({ naturalWidth: width, naturalHeight: height }) => {
      return height < width || height == width;
    })
  );
};

export default getImages;
