import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  MdPlaylistAdd,
  MdHourglassEmpty,
  MdDoneAll,
  MdAccountCircle,
} from "react-icons/md";

const Sidebar = () => {
  return (
    <div className="side-bar">
      <ul className="sidebar-container flex">
        <li className="option">
          <NavLink to="/todos" exact="true">
            <MdPlaylistAdd className="sidebar-icon" />
            <span>All Todos</span>
          </NavLink>
        </li>
        <li className="option">
          <NavLink to="/pending-todos">
            <MdHourglassEmpty className="sidebar-icon" />
            <span>Pending Todos</span>
          </NavLink>
        </li>
        <li className="option">
          <NavLink to="/completed-todos">
            <MdDoneAll className="sidebar-icon" />
            <span>Completed Todos</span>
          </NavLink>
        </li>
        <li className="option">
          <NavLink to="/profile">
            <MdAccountCircle className="sidebar-icon" />
            <span>Profile</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
