import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../assets/unisexavatar.png";
const Profile = (props) => {
  const { loggedUserInfo } = props;
  // console.log(loggedUserInfo.username);
  return (
    <div className="profileContainer">
      <div className="imgWrapper">
        <img src={Avatar} id="avatar" alt="" />

        <div className="startBtn" style={{ marginTop: "2em" }}>
          <li>
            <Link to="/members">Members directory</Link>
          </li>
        </div>
      </div>
      <div className="userInfo">
        <p>
          About me :{" "}
          {loggedUserInfo.aboutme ? loggedUserInfo.aboutme : "Not set yet"}
        </p>
        <p>
          <span> Email Address:</span>
          {loggedUserInfo.email}
        </p>
        <p>
          <span> Passion: </span>
          {loggedUserInfo.passion}
        </p>
        <p>
          {" "}
          <span>Age:</span>
          {loggedUserInfo.age}
        </p>
        <p>
          <span> Place of residence:</span>{" "}
          {loggedUserInfo.country ? loggedUserInfo.country : "Not set yet"}
        </p>
        <div className="resetBtn">
          {" "}
          <li style={{ listStyle: "none" }}>
            {" "}
            <Link to="resetpassword">Change password</Link>{" "}
          </li>
        </div>
      </div>
    </div>
  );
};
export default Profile;
