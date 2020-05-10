// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route,
  Redirect,
  withRouter,
} from "react-router-dom";
import "./App.css";
import Members from "./components/AllMembers";
import LoginPage from "./components/Loginpage";
import RegisterPage from "./components/RegisterPage";
import Profile from "./components/Profile";
import ResetPassword from "./components/ResetPassword";

function App() {
  const [userId, setId] = useState("");
  const [loggedUserName, setLoggedUserName] = useState("");

  const [toggle, setToggle] = useState(true);
  useEffect(() => {
    getUserStatus();
  }, []);

  const getUserStatus = () => {
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
        console.log("userId and username", data);
        setId(data.userId);
        setLoggedUserName(data.username);
      });
  };
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
    getUserStatus();
  };
  return (
    <Router>
      <div className="App">
        {userId ? (
          <>
            <h3>Hi {loggedUserName}</h3>
            <nav>
              <li>
                <Link to="/members">Members</Link>
              </li>

              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <button onClick={handleLogout}>Log out</button>
            </nav>
          </>
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
        <Switch>
          <Route exact path="/">
            <h1>Home page</h1>
          </Route>
          <PrivateRoute path="/members" component={Members} />

          <Route path="/login">
            <LoginPage handleUserStatus={getUserStatus} />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/resetpassword">
            <ResetPassword />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
