import React from "react";
import { Container, Nav } from "react-bootstrap";
import { useSearchParams, useNavigate } from "react-router-dom";

// 헤더 네비게이션 컴포넌트
const FollowHeaderButtons = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // 기본 탭은 'followers'로 설정
  const tabType = searchParams.get("tab") || "followers";
  
  // 탭 변경 핸들러
  const handleTabChange = (tab) => {
    // 쿼리 파라미터로 탭 변경
    setSearchParams({ tab: tab });
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
              className="btn btn-pilllaw"
            >
              맞팔로우
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link 
              onClick={() => handleTabChange("followers")} 
              active={tabType === "followers"}
              className="btn btn-pilllaw"
            >
              팔로워
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link 
              onClick={() => handleTabChange("following")} 
              active={tabType === "following"}
              className="btn btn-pilllaw"
            >
              팔로잉
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
  );
};

export default FollowHeaderButtons;