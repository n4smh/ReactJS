import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  /*
  // Native routing using JS

  return (
    <nav>
      <a href="/">Home</a>| <a href="/courses">Courses</a>|{" "}
      <a href="/about">About</a>
    </nav>
  );
  */

  const navStyle = ({ isActive }) => {
    return {
      letterSpacing: isActive ? "1px" : "0.2px",
      color: isActive ? "orange" : "green",
    };
  };

  return (
    <nav>
      <NavLink to="/" style={navStyle}>
        Home
      </NavLink>
      {" | "}
      <NavLink to="/courses" style={navStyle}>
        Courses
      </NavLink>
      {" | "}
      <NavLink to="/about" style={navStyle}>
        About
      </NavLink>
    </nav>
  );
}

export default Header;
