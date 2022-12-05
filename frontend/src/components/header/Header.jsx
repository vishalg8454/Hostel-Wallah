import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./header.css";

const encodedToken = "";
const wishlistList = [];
const cartList = [];
const handleChange = () => {};

const Header = ({ loggedIn }) => {
  const [text, setText] = useState("'");

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link className="nav-logo" to="/">
          {/* FLAT MATE */}
          Quikker
        </Link>
        <div className="right-flex">
        <ul className="nav-list">
          <li className="nav-list-items desktop-cta">
            {loggedIn ? (
              <Link to="/my-items">
                <button className="btn btn-primary-outline  nav-cta">
                  <i className="fas fa-edit"></i>
                </button>
              </Link>
            ) : (
              <Link to="/login">
                <button className="btn btn-primary-outline  nav-cta">
                  Login
                </button>
              </Link>
            )}
          </li>
          <li className="nav-list-items">
            <div>
              <Link to="/wishlist">
                {" "}
                <i className="badge-icon fas fa-heart nav-icon"></i>
              </Link>
              {wishlistList.length > 0 && (
                <div className="badge-text">{wishlistList.length}</div>
              )}
            </div>
          </li>
          <li className="nav-list-items login mobile-cta">
            <div>
              <Link to="/login">
                <i className="fas fa-user nav-icon"></i>
              </Link>
            </div>
          </li>
        </ul>
        </div>
      </div>
    </nav>
  );
};

export { Header };
