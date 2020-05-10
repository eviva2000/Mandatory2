import React, { useState, useEffect } from "react";
import { Route, Link, withRouter, Redirect } from "react-router-dom";
const Navbar = () => {
  const [userId, setId] = useState("");
  const [toggle, setToggle] = useState(true);
  useEffect(() => {
    fetch("http://localhost:9090/", {
      async: true,
      crossDomain: true,
      credentials: "include",
      method: "GET",
      headers: {
        "content-type": "application/json",
        "cache-control": "no-cache",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("userId", data.res);
        setId(data.res);
      });
  }, []);
  //Creating the private route
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        userId ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
  const handleLogout = () => {
    console.log("works");
    fetch("http://localhost:9090/logout", {
      method: "post",
      async: true,
      crossDomain: true,
      credentials: "include",
      headers: {
        "content-type": "application/json",
        "cache-control": "no-cache",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("userId", data.res);
      });
  };
  return (
    <div>
      {userId ? (
        <nav>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/members">Members</Link>
          </li>

          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <button onClick={handleLogout}>Log out</button>
        </nav>
      ) : (
        <nav>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/members">Members</Link>
          </li>
          <li>
            <Link to="/login">Log in</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </nav>
      )}
    </div>
  );
};
export default withRouter(Navbar);
