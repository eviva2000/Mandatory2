import React, { useState } from "react";
const Reserpassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(false);
  const [errorMessage, setErrortMessage] = useState(false);
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
          .then((data) => {
            console.log("here", data.message);
            if (data.message === "Recovery email sent") {
              setMessage(true);
            }
            if (data.message === "Email is not in DB") {
              setErrortMessage(true);
            }
          });
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
      {!message ? (
        <div className="resetForm">
          <h3 className="title">Change password</h3>
          <form onSubmit={sendEmail}>
            <input
              type="email"
              name=""
              id="email"
              placeholder="Enter your email address"
              onChange={handleChange}
            />

            <button className="submitButton" type="submit">
              Send email to reset password{" "}
            </button>
          </form>
          {errorMessage ? (
            <h3 style={{ color: "#bb0000" }}>Email is not correct.Try again</h3>
          ) : null}
        </div>
      ) : (
        <div style={{ backgorundColor: "rgba(0,0,0,.6)" }}>
          <h2 style={{ color: "#39C16C", marginTop: "3em" }}>
            {" "}
            Please check your email and follow the link to reset your password
          </h2>
        </div>
      )}
    </div>
  );
};
export default Reserpassword;
