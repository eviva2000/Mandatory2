import React, { useState } from "react";
import { useLocation, Redirect, Link } from "react-router-dom";
const LoginPage = (props) => {
  const [nameData, setUsername] = useState({ username: " " });
  const [passwordData, setPassword] = useState({ password: " " });
  const [redirectToReferrer, setRedirect] = useState(false);
  const handleNameInput = (e) => {
    setUsername({ [e.target.id]: e.target.value });
  };
  const handlePasswordInput = (e) => {
    setPassword({ [e.target.id]: e.target.value });
  };

  // const history = useHistory();
  // const handleRedirect = () => {
  //   history.push("/your-profile");
  // };

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
        if (data.username) {
          setRedirect(true);
        } else {
          console.log("wrong credentials");
        }
      });
    handleUserStatus();
  };
  // console.log("props", props);
  const { handleUserStatus } = props;
  let location = useLocation();
  const { from } = location.state || { from: { pathname: "/profile" } };
  //console.log("from", { from });
  if (redirectToReferrer === true) {
    return <Redirect to={from} />;
  }
  return (
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
  );
};
export default LoginPage;
