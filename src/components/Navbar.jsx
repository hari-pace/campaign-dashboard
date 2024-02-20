import React from "react";
import Trbo from "../public/Trbo.png";

const Navbar = () => {
  return (
    <div className="navbar-left">
      <div>
        <img className="logo" src={Trbo} alt="Trbo logo" />
      </div>
      <ul className="nav-links">
        <li className="navlink navlink-active">Campaign Dashboard</li>
        <li className="navlink">Customer Account</li>
        <li className="navlink">Contact Trbo</li>
      </ul>
    </div>
  );
};

export default Navbar;
