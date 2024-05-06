import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className=" footercss">
      <ul className="nav justify-content-center border-bottom pb-3">
        <li className="nav-item">
          <Link className="nav-link px-2 text-muted" to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link px-2 text-muted" to="/about">
            About
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link px-2 text-muted" to="/contact">
            Contact
          </Link>
        </li>
      </ul>
      <p className="text-center text-muted">Copyright © 2024 - All right reserved | AmiEvents</p>
    </footer>
  );
};

export default Footer;
