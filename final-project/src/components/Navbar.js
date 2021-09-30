import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="navbar">
      {/* <div className="navbar__title navbar__item">Cuvette </div> */}
      <Link to="/" className="navbar__title navbar__item">
        <h3>Cuvette</h3>
      </Link>
      <Link to="/signup" className="navbar__item">
        Sign Up
      </Link>
      <Link to="/signin" className="navbar__item">
        Sign In
      </Link>
      {/* <div className="navbar__item">About Us</div>
      <div className="navbar__item">Contact</div>
      <div className="navbar__item">Help</div> */}
    </header>
  );
};

export default Navbar;
