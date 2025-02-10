// src/components/FollowList.jsx
import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

const FollowTest = () => {
  return (
    <div className="container mt-5">
      {/* 버튼 탭 */}
      <div className="d-flex justify-content-center mb-4">
        <button variant="outline-light">맞팔로우</button>
        <button className="btn btn-pilllaw mx-2">팔로워</button>
        <button className="btn btn-pilllaw mx-2">팔로잉</button>
      </div>

      {/* 팔로우 리스트 예시 */}
      <div className="list-group">
        <a href="#" className="list-group-item">
          <img src="https://via.placeholder.com/50" alt="profile" className="rounded-circle me-2" />
          치킨
        </a>
        {/* 나머지 항목들 추가 */}
      </div>
    </div>
  );
};

export default FollowTest;