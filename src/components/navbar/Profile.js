import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import testProfilePicture from "../../assets/testProfilePicture.png";
import { isLoggedIn, logoutFromAniList } from "../../userSlice";
import onOutsideClick from "../helpers/onOutsideClick";

const Profile = () => {
  const { name: userName, avatar } = useSelector((state) => ({
    name: state.user.name,
    avatar: state.user.avatar,
  }));
  const [isExpanded, setIsExpanded] = useState(false);
  const loggedIn = useSelector(isLoggedIn);
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <li
      className={`nav-profile${isExpanded ? " active" : ""}`}
      onClick={(e) => {
        setIsExpanded((prevState) => !prevState);
        onOutsideClick(
          e.target.parentNode.parentNode,
          () => setIsExpanded(false),
          {
            custom: true,
          }
        );
      }}
    >
      <div className={`nav-profile wrapper${isExpanded ? " active" : ""}`}>
        <img
          className="profile round"
          src={avatar.length ? avatar : testProfilePicture}
          width="75"
          height="75"
        ></img>
        <span>{userName ? userName : "Nullpo"}</span>
      </div>
      {isExpanded ? (
        <div className="nav-profile actions">
          {loggedIn ? (
            <button
              className="hover"
              onClick={() => dispatch(logoutFromAniList())}
            >
              Logout
            </button>
          ) : (
            <a className="hover" onClick={() => history.push("/login")}>
              Login
            </a>
          )}
        </div>
      ) : (
        ""
      )}
    </li>
  );
};

export default Profile;
