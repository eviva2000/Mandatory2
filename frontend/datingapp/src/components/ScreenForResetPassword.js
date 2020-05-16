import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
const ResetPassScreen = (props) => {
  const [userName, setUserName] = useState("");
  const [newPassword, setNewPassword] = useState({ newpassword: "" });
  const [updated, setUpdated] = useState(false);
  const [error, setError] = useState(false);
  let { token } = useParams();
  const { handleUserStatus } = props;
  // console.log("thisss", token);
  useEffect(() => {
    try {
      fetch(`http://localhost:9090/reset?resetpasswordtoken=${token}`, {})
        .then((res) => res.json())
        .then((data) => {
          console.log(data.response);
          if (data.response.message === "password reset link a-ok") {
            setUserName(data.response.username);
            setUpdated(false);
            setError(false);
          }
        });
    } catch (error) {
      console.log("erro in catch", error);
      setUpdated(false);
      setError(true);
    }
  }, [token]);

  const handleChange = (e) => {
    setNewPassword({
      [e.target.id]: e.target.value,
    });
    console.log(newPassword);
  };
  const updatePassword = async (e) => {
    e.preventDefault();
    const userInfo = {
      userName,
      newPassword: newPassword.newpassword,
      token,
    };
    console.log(userInfo);
    try {
      const resetResponse = await axios.put(
        "http://localhost:9090/updatePasswordViaEmail",
        {
          userInfo,
        }
      );
      console.log(resetResponse);
      if (resetResponse.data.message === "password updated") {
        setError(false);
        setUpdated(true);
        handleLogOut();
        handleUserStatus();
      } else {
        setError(true);
        setUpdated(false);
      }
    } catch {
      console.log(error);
    }
  };

  const handleLogOut = async () => {
    axios
      .post("http://localhost:9090/logout")
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((error) => {
        console.log(error);
      });
  };

  if (error) {
    return (
      <div>
        <div>
          <h4>Problem resetting password. Please send another reset link.</h4>
          <Link to="/"> Home page</Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {!updated ? (
        <div>
          <h2>Changing password</h2>

          <form onSubmit={updatePassword}>
            <input
              type="text"
              name=""
              id="newpassword"
              placeholder="Type your new password"
              onChange={handleChange}
            />
            <button type="submit">Reset password</button>
          </form>
        </div>
      ) : null}

      {updated && (
        <div>
          <p style={{ color: "#39C16C" }}>
            Your password has been successfully reset, please try logging in
            again.
          </p>
        </div>
      )}
    </div>
  );
};
export default ResetPassScreen;
