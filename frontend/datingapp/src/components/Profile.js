import React from "react";
import { Link } from "react-router-dom";
const Profile = () => {
  return (
    <div>
      <h2>your Profile page</h2>
      <Link to="resetpassword">Reset password</Link>
    </div>
  );
};
export default Profile;
