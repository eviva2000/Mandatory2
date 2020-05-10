import React, { useState, useEffect } from "react";
import Avatar from "../assets/unisexavatar.png";
import { useParams } from "react-router-dom";

const SingleMember = (props) => {
  const [data, setData] = useState({ user: [] });
  let { userId } = useParams();
  useEffect(() => {
    async function fetchUserData() {
      const api_call = await fetch(`http://localhost:9090/members/${userId}`);

      const response = await api_call.json();

      setData(response);
    }
    fetchUserData();
  });

  return (
    <div>
      {data.user.map((user) => {
        return (
          <div className="userInfo" key={user.id}>
            <div id="imgWrapper">
              <img id="avatar" src={Avatar} alt="" />
            </div>
            <div id="textWrapper">
              <h2>{user.username} profile</h2>
              <h2>Age:{user.age}</h2>
              <h2>Passion:{user.passion}</h2>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default SingleMember;
