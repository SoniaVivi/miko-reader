import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import SearchBar from "./searchBar/SearchBar";
import Profile from "./navbar/Profile";

const Navbar = () => {
  const history = useHistory();
  const showNav = useSelector((state) => state.settings.showNav);

  return (
    <nav className={showNav ? null : " hide"}>
      <ul className="navbar">
        <li className="nav nav-home">
          <a onClick={() => history.replace("/")}>Home</a>
        </li>
        <SearchBar />
        <Profile />
      </ul>
    </nav>
  );
};

export default Navbar;
