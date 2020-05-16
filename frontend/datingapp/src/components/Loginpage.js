import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const LoginPage = (props) => {
  // let location = useLocation();
  // const { from } = location.state || { from: { pathname: "/profile" } };

  const [nameData, setUsername] = useState({ username: " " });
  const [passwordData, setPassword] = useState({ password: " " });
  const [error, setError] = useState(false);
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
        console.log("user logg-in status :", data);
        if (!data.username) {
          console.log("wrong credentials");
          setError(true);
        } else {
          handleRedirect();
          handleUserStatus();
        }
      });
  };
  const { handleUserStatus } = props;

  const history = useHistory();
  const handleRedirect = () => {
    history.push("/dashboard");
  };
  return (
    <div>
      <div className="loginForm">
        <h3 className="title"> In order to view all pages please login </h3>
        {error ? (
          <p style={{ color: "#bb0000" }}>Wrong credentials.Try again</p>
        ) : null}
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
          <button className="submitButton" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
export default LoginPage;
