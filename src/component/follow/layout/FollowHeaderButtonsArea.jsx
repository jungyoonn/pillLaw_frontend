import React, { useState } from "react";
import { Container } from "react-bootstrap";

const FollowHeaderButtonsArea = () => {
  const [activeTab, setActiveTab] = useState("followList");

  return (
    <div className="wrap">
      <Container style={{ paddingTop: "115.19px" }}>
        <div className="row">
          {/* 버튼 영역 */}
          <div className="btn-group">
            <button
              type="button"
              className={`btn btn-pilllaw ${activeTab === "followList" ? "active" : ""}`}
              onClick={() => setActiveTab("followList")}
            >
              맞팔로우
            </button>
            <button
              type="button"
              className={`btn btn-pilllaw ${activeTab === "followersList" ? "active" : ""}`}
              onClick={() => setActiveTab("followersList")}
            >
              팔로워
            </button>
            <button
              type="button"
              className={`btn btn-pilllaw ${activeTab === "followingList" ? "active" : ""}`}
              onClick={() => setActiveTab("followingList")}
            >
              팔로잉
            </button>
          </div>
        </div>

        {/* 선택된 탭에 따라 내용 표시 */}
        <div className="mt-3">
          {activeTab === "followList" && <div>맞팔로우 리스트</div>}
          {activeTab === "followersList" && <div>팔로워 리스트</div>}
          {activeTab === "followingList" && <div>팔로잉 리스트</div>}
        </div>
      </Container>
    </div>
  );
};

export default FollowHeaderButtonsArea;
