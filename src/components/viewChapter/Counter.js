import React, { useState } from "react";
import PropTypes from "prop-types";
import onOutsideClick from "../helpers/onOutsideClick";

const Counter = (props) => {
  const [showForm, setShowForm] = useState(false);
  if (!props.data) {
    return <div></div>;
  }

  const getDisplayTitle = (title) => (title == "none" ? "-" : title);

  return (
    <div className={`counter sidebar flex ${props.className}`}>
      <span className="counter-text">{props.text}</span>
      <div
        className={`sidebar counter form hover${showForm ? " active" : ""}`}
        onClick={(e) => {
          setShowForm(true);
          onOutsideClick(e, () => setShowForm(false), {
            parent: true,
          });
        }}
      >
        <span>{getDisplayTitle(props.current)}</span>
      </div>
      <div
        className={`counter selection${showForm ? "" : " hide"}`}
        onMouseLeave={() => setShowForm(false)}
      >
        {props.data.map((title, i) => (
          <button
            key={i}
            className={`hover${title == props.current ? " current" : ""}`}
          >
            {getDisplayTitle(title)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Counter;

Counter.propTypes = {
  data: PropTypes.array.isRequired,
  text: PropTypes.string.isRequired,
  current: PropTypes.string.isRequired,
  className: PropTypes.string,
};