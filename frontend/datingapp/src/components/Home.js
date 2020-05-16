import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <div className="message">
        <h2>One stop destination for finding your love</h2>
        <div className="startBtn">
          <li>
            <Link to="/members">MEET OUR AMAZING MEMBERS</Link>
          </li>
        </div>
      </div>
    </div>
  );
};
export default Home;
