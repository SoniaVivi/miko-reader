export const pageMenu = (totalPages, current) => {
  if (totalPages <= 8) {
    return Array.apply(null, Array(totalPages)).map((_, i) => i + 1);
  }

  let pages = [];
  [1, 2, totalPages - 1, totalPages, current - 1, current, current + 1].forEach(
    (num) => {
      if (!pages.includes(num) && num > 0 && num <= totalPages) {
        pages.push(num);
      }
    }
  );

  pages = pages.sort((a, b) => a - b);
  let bottomHeavy = current < totalPages / 2;

  if (pages.length < 7) {
    while (pages.length < 8) {
      pages = fillGap(pages, !bottomHeavy);
      bottomHeavy = !bottomHeavy;
    }
    pages = fillGap(pages, bottomHeavy, true);
  } else if (pages.length == 7) {
    pages = fillGap(pages, bottomHeavy, true);
    pages = fillGap(pages, !bottomHeavy, true);
  }

  if (pages.length == 8) pages = fillGap(pages, !bottomHeavy);

  return [...pages];
};

const fillGap = (arry, fromBottom, insertDots = false) => {
  let change = fromBottom ? 1 : -1;
  let newArry = [...arry];

  for (
    let i = fromBottom ? 0 : arry.length - 1;
    i >= 0 && i < arry.length;
    i += change
  ) {
    const insertAt = change == -1 ? i : i + change;
    const nextVal = insertDots ? "..." : arry[i] + change;

    if (arry[i + change] == "...") {
      if (!insertDots) newArry.splice(insertAt, 0, nextVal);
      return newArry;
    } else if (Math.abs(arry[i] - arry[i + change]) > 1) {
      newArry.splice(insertAt, 0, nextVal);
      return newArry;
    }
  }
};
