import React from "react";
import PropTypes from "prop-types";
import testProfilePicture from "../assets/testProfilePicture.png";

const Navbar = (props) => {
  return (
    <nav>
      <ul className="navbar">
        <li className="nav nav-home">
          <a href="/">Home</a>
        </li>
        <li className="nav">
          <input className="nav-search"></input>
        </li>
        <li className="nav">
          <div className="nav-profile">
            <img
              className="profile round"
              src={
                props.test
                  ? testProfilePicture
                  : console.log("Navbar needs profile picture")
              }
              width="75"
              height="75"
            ></img>
            <span>Nullpo</span>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

Navbar.propTypes = {
  test: PropTypes.bool,
};
