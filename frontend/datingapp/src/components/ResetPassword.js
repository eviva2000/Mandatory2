import React, { useState } from "react";
const Reserpassword = () => {
  const [email, setEmail] = useState("");
  const handleChange = (e) => {
    setEmail({
      [e.target.id]: e.target.value,
    });
    console.log(e.target.value);
  };
  const sendEmail = async (e) => {
    e.preventDefault();
    if ({ email } === "") {
      console.log("email empty");
    } else {
      try {
        await fetch("http://localhost:9090/resetpassword", {
          method: "post",
          body: JSON.stringify(email),
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => console.log("here", data));
      } catch (err) {
        if (err) {
          console.log("error is:", err);
          return;
        }
        console.log("ok");
      }
    }
  };

  return (
    <div>
      <h2>Reset password</h2>
      <form onSubmit={sendEmail}>
        <input
          type="email"
          name=""
          id="email"
          placeholder="Enter your email address"
          onChange={handleChange}
        />
        <button type="submit">Reset my password</button>
      </form>
    </div>
  );
};
export default Reserpassword;
