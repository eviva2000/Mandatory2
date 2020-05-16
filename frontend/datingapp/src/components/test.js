import React, { useState } from "react";
import { useLocation, Redirect, Link } from "react-router-dom";

const LoginPage = (props) => {
  let location = useLocation();
  const { from } = location.state || { from: { pathname: "/profile" } };

  const [nameData, setUsername] = useState({ username: " " });
  const [passwordData, setPassword] = useState({ password: " " });
  const [redirectToReferrer, setRedirect] = useState(false);
  const handleNameInput = (e) => {
    setUsername({ [e.target.id]: e.target.value });
  };
  const handlePasswordInput = (e) => {
    setPassword({ [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loggedUser = {
      username: nameData.username,
      password: passwordData.password,
    };

    await fetch("http://localhost:9090/users/login", {
      method: "post",
      body: JSON.stringify(loggedUser),
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("user logg-in status :", data.username);
        if (!data.username) {
          console.log("wrong credentials");
        }
      });
    setRedirect(true);

    handleUserStatus();
  };
  // console.log("props", props);
  const { handleUserStatus } = props;

  return (
    <div>
      {redirectToReferrer ? (
        <Redirect to={from} />
      ) : (
        <div className="login-form">
          <h4> In order to view all pages please login </h4>
          <form onSubmit={handleSubmit}>
            <input
              id="username"
              type="text"
              placeholder="Username"
              onChange={handleNameInput}
              required
            />
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handlePasswordInput}
              required
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
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
export default LoginPage;
