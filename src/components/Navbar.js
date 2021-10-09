import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import testProfilePicture from "../assets/testProfilePicture.png";
import SearchBar from "./searchBar/SearchBar";

const Navbar = (props) => {
  //eslint-disable-next-line no-unused-vars
  const history = useHistory();
  const showNav = useSelector((state) => state.settings.showNav);

  return (
    <nav className={showNav ? "" : " hide"}>
      <ul className="navbar">
        <li className="nav nav-home">
          <a href="/">Home</a>
        </li>
        <SearchBar />
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
  match: PropTypes.object,
};
