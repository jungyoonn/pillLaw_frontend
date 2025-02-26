// src/components/FollowList.jsx
import React from "react";
import FollowList from "./layout/FollowList";
import FollowingList from "./layout/FollowingList";
// import "bootstrap/dist/css/bootstrap.min.css";

const FollowTest = () => {
  return (
    <div className="container mt-5">
      <FollowList/>
      <FollowingList />
      {/* <FollowersList /> */}
    </div>
  );
};

export default FollowTest;