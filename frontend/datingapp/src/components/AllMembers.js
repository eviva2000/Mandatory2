import React, { useState, useEffect } from "react";
import { Switch, Link, Route } from "react-router-dom";
import Avatar from "../assets/unisexavatar.png";

import MemberProfile from "./SingleMember";
const Members = () => {
  const [data, setData] = useState({ users: [] });
  useEffect(() => {
    async function fetchAllMembers() {
      const api_call = await fetch("http://localhost:9090/members");

      const response = await api_call.json();

      setData(response);
    }
    fetchAllMembers();
  }, []);
  let membersLink = data.users.map((user) => {
    return (
      <div key={user.id} className="userContainer">
        <Link
          to={`/members/${user.id}`}
          style={{ textDecoration: "none", color: "#333" }}
        >
          <img id="avatar" src={Avatar} alt="user-avatar" />
          <h2>{user.username}</h2>
          <h5>Age:{user.age}</h5>
        </Link>
      </div>
    );
  });

  let membersNav = (
    <Switch>
      <Route path="/members/:userId" component={MemberProfile} />
        {/* Using fragments, allow us to group elements without adding extra nodes to the DOM.  */}
      <React.Fragment>
        <div>
          {" "}
          <h1>All Members</h1>
          <div id="usersContainer"> {membersLink}</div>
        </div>
      </React.Fragment>
    </Switch>
  );
  return (
    <div>
      <h2>Hello </h2>
      <div>{membersNav}</div>
    </div>
  );
};
export default Members;
