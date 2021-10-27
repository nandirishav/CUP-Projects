import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <>
      <header className="navbar">
        <Link to="/" className="navbar__title navbar__item">
          <h3>Cuvette</h3>
        </Link>
        <Link to="/signup" className="navbar__item">
          Sign Up
        </Link>
        <Link to="/signin" className="navbar__item">
          Sign In
        </Link>
      </header>
      <div>{props.children}</div>
    </>
  );
};

export default Navbar;
