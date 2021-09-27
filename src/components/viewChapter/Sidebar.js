import React from "react";
import PropTypes from "prop-types";
import Person from "../../assets/svgs/Person";
import People from "../../assets/svgs/People";
import Arrow from "../../assets/svgs/Arrow";
import Counter from "./Counter";

const Sidebar = (props) => {
  return (
    <div
      className={`sidebar-container flex column${props.show ? "" : " hide"}`}
    >
      <h3 className="sidebar">Lorem ipsum dolor sit amet</h3>
      <div className="counter-container">
        <Counter length={6} current={5} className="volume" text={"Vol"} />
        <Counter length={30} current={22} className="chapter" text={"Ch"} />
      </div>
      <div className="upload sidebar">
        <Person />
        <span>Lorem</span>
      </div>
      <div className="upload sidebar">
        <People />
        <span>Lorem Ipsum</span>
      </div>
      <div className="page-layout sidebar">
        <button className="hover active">Dual</button>
        <div className="divider vertical"></div>
        <button className="hover">Single</button>
      </div>
      <div className="page-mode sidebar">
        <span>Left</span>
        <Arrow className="left rectangle" width="40" height="20" />
        <span>Right</span>
      </div>
    </div>
  );
};

export default Sidebar;

Sidebar.propTypes = { show: PropTypes.bool };
