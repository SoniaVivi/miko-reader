const onOutsideClick = (event, toggle, { parent = false }) => {
  let container;
  if (!parent) {
    container = event.target;
  } else {
    container = event.target.parentNode;
  }

  const closeMenu = (mouseUpEvent) => {
    let clickedElement = mouseUpEvent.target;

    if (!container.contains(clickedElement) || clickedElement == container) {
      toggle();
      document.removeEventListener("mouseup", closeMenu);
    }
  };
  document.addEventListener("mouseup", closeMenu);
};

export default onOutsideClick;
