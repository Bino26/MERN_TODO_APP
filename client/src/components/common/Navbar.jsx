import React from "react";
import { NavLink } from "react-router-dom"; 
import { MdBarChart } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="flex">
      <div className="left-nav flex">
       <div className="bar"><MdBarChart></MdBarChart></div>
      <div className="logo">TodoList</div>
      </div>
      <div className="profile flex"><MdAccountCircle></MdAccountCircle></div>
    </nav>
  );
};

export default Navbar;
