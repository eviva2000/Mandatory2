import React, { useState } from "react";
const RegisterPage = (props) => {
  const [usernameData, setUsername] = useState({ username: "" });
  const [emailData, setEmail] = useState({ email: "" });
  const [passwordData, setPassword] = useState({ password: " " });
  const [passionData, setPassion] = useState({ passion: " " });
  const [ageData, setAge] = useState({ age: " " });
  const [repeatPasswordData, setRepeatpassword] = useState({
    repeatPassword: " ",
  });
  const handleNameInput = (e) => {
    setUsername({ [e.target.id]: e.target.value });
  };
  const handlePasswordInput = (e) => {
    setPassword({ [e.target.id]: e.target.value });
  };
  const handleReapeatpasswordInput = (e) => {
    setRepeatpassword({ [e.target.id]: e.target.value });
  };
  const handlePassionInput = (e) => {
    setPassion({ [e.target.id]: e.target.value });
  };
  const handleAgeInput = (e) => {
    setAge({ [e.target.id]: e.target.value });
  };
  const handleEmailInput = (e) => {
    setEmail({ [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      username: usernameData.username,
      email: emailData.email,
      password: passwordData.password,
      repeatPassword: repeatPasswordData.repeatPassword,
      passion: passionData.passion,
      age: ageData.age,
    };
    fetch("http://localhost:9090/users/register", {
      method: "post",

      body: JSON.stringify(newUser),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(" Registeration status", data);
      });
  };

  return (
    <div>
      <h2>Register page</h2>
      <form onSubmit={handleSubmit}>
        <input
          id="username"
          type="text"
          placeholder="Username"
          onInput={handleNameInput}
          required
        />
        <input
          id="email"
          type="email"
          placeholder="Email"
          onInput={handleEmailInput}
          required
        />
        <input
          id="password"
          type="text"
          name=""
          placeholder="Password"
          onInput={handlePasswordInput}
          required
        />
        <input
          id="repeatPassword"
          type="text"
          name=""
          placeholder="Repeat Password"
          onInput={handleReapeatpasswordInput}
          required
        />
        <input
          id="passion"
          type="text"
          name=""
          placeholder="Passion"
          onInput={handlePassionInput}
          required
        />
        <input
          id="age"
          type="text"
          name=""
          placeholder="Age"
          onInput={handleAgeInput}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default RegisterPage;
