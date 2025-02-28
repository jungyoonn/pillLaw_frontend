import React from "react";
import { useSearchParams } from "react-router-dom";

import FollowersList from "../layout/FollowersList";
import FollowList from "../layout/FollowList";
import FollowingList from "../layout/FollowingList";
import FollowHeaderButtons from "../layout/FollowHeaderButtonsArea";
import { Col, Row } from "react-bootstrap";

const FollowApp = () => {
  const [searchParams] = useSearchParams();
  const tabType = searchParams.get("tab") || "followers";

  return (
    <Row>
      <Col xs="1" />
      <Col>
        <FollowHeaderButtons />
        
        {/* 쿼리 파라미터에 따라 컴포넌트 조건부 렌더링 */}
        {tabType === "follow" && <FollowList />}
        {tabType === "followers" && <FollowersList />}
        {tabType === "following" && <FollowingList />}
      </Col>
      <Col xs="2" />
    </Row>
  );
};
export default FollowApp;