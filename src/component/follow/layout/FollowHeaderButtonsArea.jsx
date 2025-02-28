import React from "react";
import { Container, Nav } from "react-bootstrap";
import { useSearchParams, useNavigate } from "react-router-dom";

// 헤더 네비게이션 컴포넌트
const FollowHeaderButtons = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // 현재 마이페이지 탭 유지
  const currentTab = searchParams.get("tab") || "followapp";
  
  // 기본 팔로우 타입은 'followers'로 설정
  const tabType = searchParams.get("tabType") || "followers";
  
  // 팔로우 타입 변경 핸들러
  const handleTabChange = (type) => {
    // 기존 쿼리 파라미터 유지하면서 tabType 변경
    const newParams = new URLSearchParams(searchParams);
    newParams.set("type", type);
    
    // 쿼리 파라미터 업데이트
    setSearchParams(newParams);
  };

  // 전체 경로로 이동하는 경우
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
      <Container style={{ paddingTop: '115.19px' }}>
        <Nav fill variant="tabs" defaultActiveKey={tabType}>
          <Nav.Item>
            <Nav.Link 
              onClick={() => handleTabChange("follow")} 
              active={tabType === "follow"}
              className={tabType === "follow" ? "btn btn-pilllaw active" : "btn btn-pilllaw"}
            >
              맞팔로우
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link 
              onClick={() => handleTabChange("followers")} 
              active={tabType === "followers"}
              className={tabType === "followers" ? "btn btn-pilllaw active" : "btn btn-pilllaw"}
            >
              팔로워
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link 
              onClick={() => handleTabChange("following")} 
              active={tabType === "following"}
              className={tabType === "following" ? "btn btn-pilllaw active" : "btn btn-pilllaw"}
            >
              팔로잉
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
  );
};

export default FollowHeaderButtons;