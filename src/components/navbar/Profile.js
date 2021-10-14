import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import testProfilePicture from "../../assets/testProfilePicture.png";
import { isLoggedIn } from "../../userSlice";

const Profile = () => {
  const userName = useSelector((state) => state.user.name);
  const [isExpanded, setIsExpanded] = useState(false);
  const loggedIn = useSelector(isLoggedIn);
  const history = useHistory();

  return (
    <li
      className={`nav-profile${isExpanded ? " active" : ""}`}
      onClick={() => setIsExpanded((prevState) => !prevState)}
    >
      <div className={`nav-profile wrapper${isExpanded ? " active" : ""}`}>
        <img
          className="profile round"
          src={testProfilePicture}
          width="75"
          height="75"
        ></img>
        <span>{userName ? userName : "Nullpo"}</span>
      </div>
      {isExpanded ? (
        <div className="nav-profile actions">
          {loggedIn ? (
            <a>Logout</a>
          ) : (
            <a onClick={() => history.push("/login")}>Login</a>
          )}
        </div>
      ) : (
        ""
      )}
    </li>
  );
};

export default Profile;
