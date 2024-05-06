import React from "react";
import { Link, useParams } from "react-router-dom";

const ParticipantNavbar = () => {
  const { id } = useParams();
  return (
    <nav className="navbar navbar-expand-lg ">
      <Link className="navbar-brand text-success" to={`/participant/${id}`}>
        AmiEvents
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className={`nav-link text-success h4 mt-1`} to={`/participant/${id}`}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link text-success h4 mt-1`} to={`/participant/${id}/my-events`}>
              My Events
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link text-success h4 mt-1`}
              to={`/participant/${id}/upcoming-events`}
            >
              Upcoming Events
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-success h4 mt-1" to="/">
              Sign Out
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default ParticipantNavbar;
