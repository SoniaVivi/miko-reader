import React, { useState } from "react";
import PropTypes from "prop-types";
import onOutsideClick from "../helpers/onOutsideClick";

const Counter = (props) => {
  const [showForm, setShowForm] = useState(false);

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
        <span>{props.current + 1}</span>
      </div>
      <div
        className={`counter selection${showForm ? "" : " hide"}`}
        onMouseLeave={() => setShowForm(false)}
      >
        {[...Array(props.length)].map((_, i) => (
          <button
            key={i}
            className={`hover${i == props.current ? " current" : ""}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Counter;

Counter.propTypes = {
  length: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  current: PropTypes.number.isRequired,
  className: PropTypes.string,
};
