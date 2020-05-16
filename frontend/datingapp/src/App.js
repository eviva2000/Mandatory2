// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Members from "./components/AllMembers";
import LoginPage from "./components/Loginpage";
import RegisterPage from "./components/RegisterPage";
import Profile from "./components/Profile";
import ResetPassword from "./components/ResetPassword";
import ResetPassScreen from "./components/ScreenForResetPassword";
import Logout from "./components/Logout";
function App() {
  const [userId, setId] = useState("");
  const [auth, setAuth] = useState(false);
  const [loggedUserInfo, setLoggedUserInfo] = useState({});
  const [loggedUserName, setLoggedUserName] = useState("");

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
        if (!data.isAuthenticated && !data.id) {
          setAuth(false);
        } else {
          setAuth(true);
        }
        setId(data.id);
        setLoggedUserInfo(data);
        setLoggedUserName(data.username);
      });
  };
  //Creating the private route
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        auth === true ? (
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
  return (
    <Router>
      <div className="App">
        <Navbar userId={userId} loggedUserName={loggedUserName} />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <PrivateRoute path="/members" component={Members} />
          )} />
          <Route path="/login">
            <LoginPage handleUserStatus={getUserStatus} />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route path="/dashboard">
            <Profile loggedUserInfo={loggedUserInfo} />
          </Route>
          <Route path="/logout">
            <Logout handleUserStatus={getUserStatus} />
          </Route>
          <Route path="/resetpassword">
            <ResetPassword />
          </Route>
          <Route
            exact
            path="/reset/:token"
            component={ResetPassScreen}
            handleUserStatus={getUserStatus}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
