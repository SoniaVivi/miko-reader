const onOutsideClick = (
  event,
  toggle,
  { parent = false, custom = false } = {}
) => {
  let container;
  if (parent) {
    container = event.target.parentNode;
  } else if (!parent && !custom) {
    container = event.target;
  } else {
    container = event;
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
