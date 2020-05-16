import React, { useState, useEffect } from "react";
import Logo from "../assets/Download-Heart-PNG-HD.png";
import { Link } from "react-router-dom";
const Navbar = (props) => {
  const { loggedUserName, userId } = props;
  // console.log(typeof loggedUserName);
  return (
    <div>
      <header>
        <div className="logoWrapper" style={{ display: "flex" }}>
          <img src={Logo} alt="" />
          {userId ? (
            <p style={{ color: "white", paddingLeft: "1em" }}>
              Hi {loggedUserName}!{" "}
            </p>
          ) : null}
        </div>
        {userId ? (
          <>
            <nav>
              <li></li>

              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/logout">Log out</Link>
              </li>
            </nav>
          </>
        ) : (
          <nav>
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/login">Log in</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </nav>
        )}
      </header>
    </div>
  );
};
export default Navbar;
